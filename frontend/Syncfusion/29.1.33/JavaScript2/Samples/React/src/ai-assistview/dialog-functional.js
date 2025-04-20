"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./dialog.css");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var data = require("./promptResponseData.json");
var Dialog = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var assistInstance = (0, react_1.useRef)(null);
    var dialogInstance = (0, react_1.useRef)(null);
    var promptsData = [
        {
            response: "Ask Questions, to better understand how your prompt interacts with AI-generated or default data responses..!"
        }
    ];
    var prompts = data["defaultPromptResponseData"];
    var suggestion = data["defaultSuggestions"];
    var bannerTemplate = "<div class=\"banner-content\">\n        <div class=\"e-icons e-assistview-icon\"></div>\n        <h3>AI Assistance</h3>\n        <i>To get started, provide input or choose a suggestion.</i>\n    </div>";
    var leftContent = function () {
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
    var rightContent = function () {
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
                React.createElement("br", null))));
    };
    var toolbarItemClicked = function (args) {
        if (args.item.iconCss === 'e-icons e-close') {
            dialogInstance.current.hide();
        }
        if (args.item.iconCss === 'e-icons e-assist-copy') {
            var targetElem = document.querySelector('.right-content .content');
            var response = assistInstance.current.prompts[args.dataIndex].response;
            if (targetElem) {
                targetElem.innerHTML += response + '<br />';
                dialogInstance.current.hide();
            }
        }
    };
    var assistViewToolbarSettings = {
        itemClicked: toolbarItemClicked,
        items: [{ iconCss: 'e-icons e-close', align: 'Right' }]
    };
    var responseToolbarsettings = {
        itemClicked: toolbarItemClicked
    };
    var fabClicked = function () {
        dialogInstance.current.show();
    };
    var promptRequest = function (args) {
        setTimeout(function () {
            var foundPrompt = prompts.find(function (promptObj) { return promptObj.prompt === args.prompt; });
            var defaultResponse = 'For real-time prompt processing, connect the AI AssistView control to your preferred AI service, such as OpenAI or Azure Cognitive Services. Ensure you obtain the necessary API credentials to authenticate and enable seamless integration.';
            assistInstance.current.addPromptResponse(foundPrompt ? foundPrompt.response : defaultResponse);
            assistInstance.current.promptSuggestions = (foundPrompt === null || foundPrompt === void 0 ? void 0 : foundPrompt.suggestions) || suggestion;
        }, 2000);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "dialog-aiassistview" },
                React.createElement(ej2_react_layouts_1.SplitterComponent, { id: "splitter", height: '600px' },
                    React.createElement(ej2_react_layouts_1.PanesDirective, null,
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: '22%', resizable: false, content: leftContent }),
                        React.createElement(ej2_react_layouts_1.PaneDirective, { size: '78%', resizable: false, content: rightContent })))),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialogElem", width: '440px', height: '100%', ref: dialogInstance, visible: false, target: '.dialog-aiassistview', cssClass: 'custom-dialog' },
                React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "aiAssistView", ref: assistInstance, cssClass: 'custom-aiassistview', promptSuggestions: suggestion, promptRequest: promptRequest, bannerTemplate: bannerTemplate, toolbarSettings: assistViewToolbarSettings, responseToolbarSettings: responseToolbarsettings })),
            React.createElement(ej2_react_buttons_1.FabComponent, { id: "fabElem", iconCss: 'e-icons e-assistview-icon', content: 'AI Assist', target: '.dialog-aiassistview', onClick: fabClicked })),
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
exports.default = Dialog;
