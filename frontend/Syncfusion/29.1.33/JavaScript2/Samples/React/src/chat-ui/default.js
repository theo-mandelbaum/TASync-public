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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var React = require("react");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_splitbuttons_1 = require("@syncfusion/ej2-splitbuttons");
require("./default.css");
var data = require("./messageData.json");
var sample_base_1 = require("../common/sample-base");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleUserTyping = function (args, otherChatUser) {
            if (!args.isTyping) {
                if (otherChatUser) {
                    otherChatUser.typingUsers = otherChatUser.typingUsers.filter(function (userItem) { return userItem.user !== args.user.user; });
                }
            }
            else {
                if (otherChatUser && !otherChatUser.typingUsers.some(function (userItem) { return userItem.user === args.user.user; })) {
                    otherChatUser.typingUsers = __spreadArray(__spreadArray([], otherChatUser.typingUsers, true), [args.user], false);
                }
            }
        };
        _this.handleMessageSend = function (args, sender) {
            _this.chatUser2Ref.suggestions = [];
            if (sender === 'user1') {
                _this.chatUser2Ref.messages = __spreadArray(__spreadArray([], _this.chatUser1Ref.messages, true), [args.message], false);
            }
            else if (sender === 'user2') {
                _this.chatUser1Ref.messages = __spreadArray(__spreadArray([], _this.chatUser2Ref.messages, true), [args.message], false);
            }
        };
        return _this;
    }
    Default.prototype.componentDidMount = function () {
        var chatUser1 = this.chatUser1Ref;
        var chatUser2 = this.chatUser2Ref;
        if (chatUser1 && chatUser2) {
            this.initializeDropdown(chatUser1, '#dduser1Menu');
            this.initializeDropdown(chatUser2, '#dduser2Menu');
        }
    };
    Default.prototype.initializeDropdown = function (chatUser, buttonId) {
        var dropdownConfig = {
            items: [
                { text: 'Mute', iconCss: 'e-icons e-eye-slash' },
                { separator: true },
                { text: 'Delete', iconCss: 'e-icons e-trash' }
            ],
            iconCss: 'e-icons e-more-horizontal-1',
            cssClass: 'e-caret-hide',
            select: function (args) {
                if (['Mute', 'Unmute'].includes(args.item.text)) {
                    args.item.text = args.item.text === 'Mute' ? 'Unmute' : 'Mute';
                }
                if (args.item.text === 'Delete') {
                    chatUser.messages = [];
                }
            }
        };
        new ej2_splitbuttons_1.DropDownButton(dropdownConfig, buttonId);
    };
    Default.prototype.render = function () {
        var _this = this;
        var user1ToolbarSettings = {
            items: [
                { type: 'Input', template: '<button id="dduser1Menu" style="border: none; background: none !important;"></button>', align: 'Right' }
            ]
        };
        var user2ToolbarSettings = {
            items: [
                { type: 'Input', template: '<button id="dduser2Menu" style="border: none; background: none !important;"></button>', align: 'Right' }
            ]
        };
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "control-section chat-ui" },
                React.createElement("div", { className: "default-chatui" },
                    React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { headerText: 'Albert', headerIconCss: "chat_user1_avatar", user: { id: 'user2', user: 'Reena', avatarUrl: './src/chat-ui/images/reena.png' }, messages: data["chatMessagedata"], userTyping: function (args) { return _this.handleUserTyping(args, _this.chatUser2Ref); }, headerToolbar: user1ToolbarSettings, messageSend: function (args) { return _this.handleMessageSend(args, 'user1'); } }),
                    React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { headerText: 'Reena', headerIconCss: "chat_user2_avatar", user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }, messages: data["chatMessagedata"], suggestions: data["defaultChatSuggestions"], userTyping: function (args) { return _this.handleUserTyping(args, _this.chatUser1Ref); }, headerToolbar: user2ToolbarSettings, messageSend: function (args) { return _this.handleMessageSend(args, 'user2'); } }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the features of the Chat UI component, designed to simulate a real-time chat interface. It highlights customizable elements like headers, avatars, synchronized messaging update, and real-time typing indicators.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, two Chat UI web components are used to represent users ",
                    React.createElement("b", null, "Albert"),
                    " and ",
                    React.createElement("b", null, "Reena"),
                    ", each with a unique header, avatar, and toolbar. Messages are instantly synchronized between the two users through the ",
                    React.createElement("code", null, "messageSend"),
                    " event, while typing indicators are shown in the other chat interface via the ",
                    React.createElement("code", null, "userTyping"),
                    " event, adding a more interactive feel. This example demonstrates how to use the Chat UI component to display chat messages for multiple users. The chat interface allows switching between users' conversations, with bot responses triggered by user input. A header toolbar is included, and a splitter layout displays the chat alongside a list view for easy navigation."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
