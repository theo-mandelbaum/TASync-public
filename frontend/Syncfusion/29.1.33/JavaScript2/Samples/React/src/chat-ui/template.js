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
exports.Template = void 0;
var React = require("react");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
require("./template.css");
var data = require("./messageData.json");
var sample_base_1 = require("../common/sample-base");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emptyChatTemplate = function () { return (React.createElement("div", { className: "emptychat-content" },
            React.createElement("h3", null,
                React.createElement("span", { className: "e-icons e-comment-show" })),
            React.createElement("div", { className: "emptyChatText", style: { fontSize: '16px' } }, "Just a second, we're preparing your chat..."))); };
        _this.messageTemplate = function (context) {
            var isAdmin = context.message.author.id === 'admin';
            var userImage = !isAdmin ? (React.createElement("img", { className: "message-user", src: context.message.author.avatarUrl, alt: "User Avatar" })) : null;
            var suggestions = context.message.suggestions && context.message.suggestions.length > 0 && !isAdmin ? (React.createElement("div", { className: "message-suggestions" }, context.message.suggestions.map(function (suggestion, index) { return (React.createElement("button", { key: index, className: "suggestion-button e-btn e-primary e-outline" }, suggestion)); }))) : null;
            return (React.createElement("div", { className: 'message-wrapper' },
                React.createElement("div", { className: 'message-template' },
                    userImage,
                    React.createElement("div", { className: "message-items e-card" },
                        React.createElement("div", { className: "message-text", dangerouslySetInnerHTML: { __html: context.message.text } }))),
                React.createElement("div", { className: "suggestion-container" }, suggestions)));
        };
        _this.timeBreakTemplate = function (context) {
            var dateText = context.messageDate.toDateString() === new Date().toDateString() ? 'Today' : context.messageDate;
            return (React.createElement("div", { className: "timebreak-template" }, dateText));
        };
        _this.bindClickAction = function () {
            setTimeout(function () {
                if (_this.chatUiInst) {
                    _this.chatUiInst.element.querySelectorAll('.suggestion-button').forEach(function (suggestion) {
                        suggestion.addEventListener('click', function () { return _this.handleSuggestionClick(suggestion); });
                    });
                }
            });
        };
        _this.handleSuggestionClick = function (suggestion) {
            var templateChatUI = _this.chatUiInst;
            if (templateChatUI) {
                var message_1 = data["templateMessagedata"].find(function (message) { return message.text === suggestion.innerText; });
                if (message_1) {
                    templateChatUI.addMessage(message_1.text);
                    setTimeout(function () {
                        var messageModel = {
                            author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                            text: message_1.reply,
                            suggestions: message_1.suggestions
                        };
                        templateChatUI.addMessage(messageModel);
                        _this.bindClickAction();
                        if (message_1.suggestions.length === 0) {
                            templateChatUI.showFooter = true;
                        }
                    }, 500);
                    suggestion.parentElement.innerHTML = '';
                }
            }
        };
        _this.handleMessageSend = function () {
            setTimeout(function () {
                var defaultResponse = "Unfortunately, I don't have information on that. Use any real-time data streaming service to provide chat updates.";
                var message = {
                    author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                    text: defaultResponse
                };
                _this.chatUiInst.addMessage(message);
            }, 500);
        };
        return _this;
    }
    Template.prototype.componentDidMount = function () {
        var _this = this;
        // Initial bot message with suggestions
        setTimeout(function () {
            var message = {
                author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                text: data["templateMessagedata"][0].text,
                suggestions: data["templateMessagedata"][0].suggestions
            };
            _this.chatUiInst.addMessage(message);
            _this.bindClickAction();
        }, 1500);
    };
    Template.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "template-chatui" },
                    React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { headerText: "Order Assistant", headerIconCss: "chat-bot", showTimeBreak: true, showFooter: false, autoScrollToBottom: true, user: { id: 'admin', user: 'Admin', avatarUrl: './src/chat-ui/images/bot.png' }, emptyChatTemplate: this.emptyChatTemplate, messageTemplate: this.messageTemplate, timeBreakTemplate: this.timeBreakTemplate, messageSend: function () { return _this.handleMessageSend(); } }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the template functionality of the Chat UI component, showing how you can customize various elements of the chat interface. It highlights the ability to adjust the appearance of message items, time breaks, and empty chat screens using templates.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, a bot provides order tracking updates by customizing each message using the templates. The ",
                    React.createElement("code", null, "messageTemplate"),
                    " property controls the layout of messages, including the avatar, message content, and suggestions. The ",
                    React.createElement("code", null, "timeBreakTemplate"),
                    " adjusts the display of time breaks, showing either \"Today\" or the specific date."),
                React.createElement("p", null, "The bot sends a default response when a message is sent, and suggestions appear below the message. When a suggestion is clicked, the bot replies with a new message or set of suggestions, demonstrating how templates enhance the interaction flow within the Chat UI component."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
