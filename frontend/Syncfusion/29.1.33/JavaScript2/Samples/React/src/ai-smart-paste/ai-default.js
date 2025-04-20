"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_2 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./default.css");
function Default() {
    var _this = this;
    React.useEffect(function () {
        var copyContent = document.getElementById('bug-report-text');
        copyContent.innerHTML = bugReports[0];
    }, []);
    var copyButton;
    var chipList;
    var bugPresets = [
        "Issue with the dropdown menu",
        "Trouble logging into the website",
        "Search functionality not working",
        "Images missing on the product page"
    ];
    var bugReports = [
        "Hi, this is Alice. On July 3rd, I've come across a bug where the dropdown menu in the navigation bar doesn't close after selecting an item. I just navigated to the homepage, opened the dropdown menu in the navigation bar, clicked an item in the dropdown and then the issue occurred which happens only on Chrome. Though this doesn't seem like a serious/important bug, kindly look into it and resolve it. Regards, J Alice Abraham",
        "Hey team, On May 2nd, K John Doe reported an issue where the login page refreshes instead of logging in when the user clicks the login button. This problem prevents users from accessing their accounts, making it a critical issue that needs immediate attention. The issue has been observed across all major browsers. To reproduce the issue, open any browser and navigate to the website's login page. Enter a valid username and password, then click the Login button.",
        "Hi, Whenever I type something in the search bar and hit search, it doesn't return any results, even for items I know exist. This problem was noticed by Jane Smith on July 5th in FireFox browser. You can repro the issue by opening the site in the Firefox browser and navigate to the search bar. Type in any search term, including items that are known to exist, and click the search button. The search functionality fails to return any results, displaying an empty result set even for valid queries. This is quite important, but not urgent. Please look into it. Regards, M William Marker",
        "Hello, When I selected the category option on the landing page and chose the electronics category, the images were missing on the product page. The placeholders are there, but no actual images are loading. This happens on all browsers. I reported this on July 3rd. It's not urgent, but it does affect the user experience. Regards, L Mike Johnson"
    ];
    var serverAIRequest = function (options) { return __awaiter(_this, void 0, void 0, function () {
        var output, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    output = '';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, window.getAzureChatAIRequest(options)];
                case 2:
                    output = (_a.sent());
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.error("Error:", error_1);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/, output];
            }
        });
    }); };
    var onCopyClickHandler = function () { return __awaiter(_this, void 0, void 0, function () {
        var copyContent;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    copyContent = document.getElementById('bug-report-text');
                    return [4 /*yield*/, navigator.clipboard.writeText(copyContent.innerHTML)];
                case 1:
                    _a.sent();
                    copyButton.content = "Copied";
                    copyButton.iconCss = "e-icons e-check";
                    return [2 /*return*/];
            }
        });
    }); };
    var chipsClickHandler = function (e) {
        var copyContent = document.getElementById('bug-report-text');
        copyContent.innerHTML = bugReports[e.index];
        chipList.selectedChips = e.index;
        copyButton.content = "Copy";
        copyButton.iconCss = "e-icons e-copy";
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("form", { className: "form-container container bug-form-container", style: {
                        maxWidth: "900px",
                        lineHeight: "35px", backgroundColor: "#f3f4f6"
                    } },
                    React.createElement("div", { className: "single-row-group" },
                        React.createElement("label", { htmlFor: "bug-name", className: "e-form-label" }, "Bug Name"),
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "bug-name", placeholder: "What's the bug ?", floatLabelType: "Never" })),
                    React.createElement("div", { className: "row-group" },
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "reporter-name", className: "e-form-label" }, "Reporter"),
                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "reporter-name", placeholder: "Who is the reporter ?", floatLabelType: "Never" })),
                        React.createElement("div", null,
                            React.createElement("label", { htmlFor: "submitted-date", className: "e-form-label" }, "Submitted Date"),
                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "submitted-date", placeholder: "When it is reported ?", floatLabelType: "Never" }))),
                    React.createElement("div", { className: "form-group" },
                        React.createElement("label", { htmlFor: "bug-description", className: "e-form-label" }, "Bug Description"),
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "bug-description", placeholder: "Describe a little about the bug.", rows: 2, floatLabelType: "Never" })),
                    React.createElement("div", { className: "row-group" },
                        React.createElement("div", { style: { display: "flex", flexDirection: "column" } },
                            React.createElement("label", { htmlFor: "reproduce-steps", className: "e-form-label" }, "Reproduce Steps"),
                            React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "reproduce-steps", placeholder: "Enter the repro steps here..", cols: 30, rows: 4, floatLabelType: "Never" })),
                        React.createElement("div", null,
                            React.createElement("label", { className: "form-label" }, "Bug Priority"),
                            React.createElement("div", { className: "row" },
                                React.createElement(ej2_react_buttons_2.RadioButtonComponent, { id: "radio1", label: "Low", name: "bug-priority", value: "low" })),
                            React.createElement("div", { className: "row" },
                                React.createElement(ej2_react_buttons_2.RadioButtonComponent, { id: "radio2", label: "Medium", name: "bug-priority", value: "medium", checked: true })),
                            React.createElement("div", { className: "row" },
                                React.createElement(ej2_react_buttons_2.RadioButtonComponent, { id: "radio3", label: "High", name: "bug-priority", value: "high" })))),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "browser", className: "form-label" }, "Select the browser"),
                        React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "browser", popupHeight: '230px', dataSource: ['Chrome', 'Firefox', 'Safari'], placeholder: 'Choose the browser' })),
                    React.createElement("div", { className: "form-footer" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { type: "reset", id: "reset", content: "Reset", iconCss: "e-icons e-reset", className: "form-button" }),
                        React.createElement(ej2_react_buttons_1.SmartPasteButtonComponent, { type: "button", id: "smart-paste", className: "form-button", content: 'Smart Paste', iconCss: "e-icons e-paste", aiAssistHandler: serverAIRequest }))),
                React.createElement("div", { className: "col-lg-4 property-section" },
                    React.createElement("div", { className: "property-panel-section" },
                        React.createElement("div", { className: "property-panel-content" },
                            React.createElement("h4", null, " Choose a preset below "),
                            React.createElement("div", { className: "chip-container" },
                                React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chip-choice", "aria-label": "choiceChips", ref: function (chip) { return chipList = chip; }, chips: bugPresets, selection: 'Single', selectedChips: [0], click: chipsClickHandler })),
                            React.createElement("div", { id: "bug-report-text" }),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "copy-btn", ref: function (button) { return copyButton = button; }, content: 'Copy', iconCss: "e-icons e-copy", onClick: onCopyClickHandler })))),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null,
                        "This example demonstrates how the ",
                        React.createElement("code", null, "SmartPasteButton"),
                        " component can automatically fill out forms using data from the user's clipboard."),
                    React.createElement("p", null,
                        "To explore this and more Syncfusion React Smart AI integrations locally, check out our ",
                        React.createElement("a", { target: '_blank', href: 'https://github.com/syncfusion/smart-ai-samples/tree/master/react/ej2-react-ai-samples', "aria-label": "Navigate to explore the syncfusion React AI Demos repository" }, "GitHub repository"),
                        ".")),
                React.createElement("div", { id: 'description' },
                    React.createElement("p", null, "In this example, clicking the Smart Paste button retrieves data from the clipboard and automatically fills in the form fields. This streamlines the data entry process by removing the need for manual input."))))));
}
exports.default = Default;
