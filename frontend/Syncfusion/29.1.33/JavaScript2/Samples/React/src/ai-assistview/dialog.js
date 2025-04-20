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
exports.Dialog = void 0;
var React = require("react");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var sample_base_1 = require("../common/sample-base");
require("./dialog.css");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var data = require("./promptResponseData.json");
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    function Dialog(props) {
        var _this = _super.call(this, props) || this;
        _this.promptsData = [
            {
                response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
            }
        ];
        _this.prompts = data["defaultPromptResponseData"];
        _this.suggestion = data["defaultSuggestions"];
        _this.bannerTemplate = "<div class=\"banner-content\">\n    <div class=\"e-icons e-assistview-icon\"></div>\n    <h3>AI Assistance</h3>\n    <i>To get started, provide input or choose a suggestion.</i>\n  </div>";
        _this.leftContent = function () {
            return (React.createElement("div", { className: "assist-left-content" },
                React.createElement("div", { className: "header" }, "Quick Notes"),
                React.createElement("hr", null),
                React.createElement("div", { className: "content e-card" },
                    React.createElement("div", { className: "note-title" },
                        React.createElement("div", { className: "heading" }, "Planning and Requirements"),
                        React.createElement("div", { className: "sub-heading" }, "Outline the process of gathering input from stakeholders")),
                    React.createElement("div", { className: "note-title e-skeleton e-skeleton-text" },
                        React.createElement("div", { className: "heading" }, "Meeting with Stakeholders"),
                        React.createElement("div", { className: "sub-heading" }, "Discuss strategies for conducting productive meetings with stakeholders")),
                    React.createElement("div", { className: "note-title" },
                        React.createElement("div", { className: "heading" }, "Risk Management and Problem-Solving"),
                        React.createElement("div", { className: "sub-heading" }, "Offer tips on how to proactively manage challenges, including regular")),
                    React.createElement("div", { className: "note-title" },
                        React.createElement("div", { className: "heading e-skeleton e-skeleton-text" }),
                        React.createElement("div", { className: "sub-heading e-skeleton e-skeleton-text" })),
                    React.createElement("div", { className: "note-title" },
                        React.createElement("div", { className: "heading e-skeleton e-skeleton-text" })))));
        };
        _this.rightContent = function () {
            return (React.createElement("div", { className: "right-content" },
                React.createElement("div", { className: "heading" }, "Meeting with Stakeholders"),
                React.createElement("hr", null),
                React.createElement("div", { className: "date-info" }, "Tuesday, August 27, 2024"),
                React.createElement("div", { className: "content e-card", contentEditable: true, suppressContentEditableWarning: true },
                    React.createElement("i", null,
                        React.createElement("mark", null, "(Open AI Assist, generate a response, and click 'Copy' from the toolbar item to get it updated here.)")),
                    "Discuss strategies for conducting productive meetings with stakeholders. ",
                    React.createElement("br", null),
                    "Highlight the significance of setting clear agendas, defining outcomes, and maintaining open communication. ",
                    React.createElement("br", null),
                    _this.state.content)));
        };
        _this.toolbarItemClicked = function (args) {
            if (args.item.iconCss === 'e-icons e-close') {
                _this.setState({ dialogVisibility: false });
            }
            if (args.item.iconCss === 'e-icons e-assist-copy') {
                var targetElem = document.querySelector('.right-content .content');
                var response = _this.assistInstance.prompts[args.dataIndex].response;
                if (targetElem) {
                    _this.setState({
                        content: targetElem.innerText + response + '<br />',
                        dialogVisibility: false
                    });
                }
            }
        };
        _this.assistViewToolbarSettings = {
            itemClicked: _this.toolbarItemClicked,
            items: [{ iconCss: 'e-icons e-close', align: 'Right' }]
        };
        _this.responseToolbarsettings = {
            itemClicked: _this.toolbarItemClicked
        };
        _this.promptRequest = function (args) {
            setTimeout(function () {
                var foundPrompt = _this.prompts.find(function (promptObj) { return promptObj.prompt === args.prompt; });
                var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
                _this.assistInstance.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
                _this.assistInstance.promptSuggestions = (foundPrompt === null || foundPrompt === void 0 ? void 0 : foundPrompt.suggestions) || _this.suggestion;
            }, 2000);
        };
        _this.fabClicked = function () {
            _this.setState({ dialogVisibility: true });
        };
        _this.state = {
            dialogVisibility: false,
            content: ''
        };
        return _this;
    }
    Dialog.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "dialog-aiassistview" },
                    React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "splitter", height: '600px' },
                        React.createElement(ej2_react_layouts_1.PanesDirective, null,
                            React.createElement(ej2_react_layouts_1.PaneDirective, { size: '22%', resizable: false, content: this.leftContent }),
                            React.createElement(ej2_react_layouts_1.PaneDirective, { size: '78%', resizable: false, content: this.rightContent })))),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialogElem", width: '440px', height: '100%', visible: this.state.dialogVisibility, target: '.dialog-aiassistview', cssClass: 'custom-dialog' },
                    React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", ref: function (aiassistView) { return (_this.assistInstance = aiassistView); }, cssClass: 'custom-aiassistview', promptSuggestions: this.suggestion, promptRequest: this.promptRequest, bannerTemplate: this.bannerTemplate, toolbarSettings: this.assistViewToolbarSettings, responseToolbarSettings: this.responseToolbarsettings })),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fabElem", iconCss: 'e-icons e-assistview-icon', content: 'AI Assist', target: '.dialog-aiassistview', onClick: this.fabClicked })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the usage of dialogs in the AI AssistView component. You can display the generated responses in the notes view.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the AI AssistView is shown inside a dialog component, which opens with a floating action button (FAB) click. It uses predefined ",
                    React.createElement("code", null, "promptSuggestions"),
                    " that are displayed based on user configuration and a custom toolbar item as a close icon to close the dialog. The ",
                    React.createElement("code", null, "promptRequest"),
                    " event finds matching prompts and displays the responses."))));
    };
    return Dialog;
}(sample_base_1.SampleBase));
exports.Dialog = Dialog;
