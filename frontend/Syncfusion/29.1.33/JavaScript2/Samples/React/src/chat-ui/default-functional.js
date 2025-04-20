"use strict";
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
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_splitbuttons_1 = require("@syncfusion/ej2-splitbuttons");
require("./default.css");
var data = require("./messageData.json");
var Default = function () {
    var chatUser1Ref = (0, react_1.useRef)(null);
    var chatUser2Ref = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        var chatUser1 = chatUser1Ref.current;
        var chatUser2 = chatUser2Ref.current;
        if (chatUser1 && chatUser2) {
            // Initialize the dropdown buttons
            var dropdownConfig = function (chatUser) { return ({
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
            }); };
            new ej2_splitbuttons_1.DropDownButton(dropdownConfig(chatUser1), '#dduser1Menu');
            new ej2_splitbuttons_1.DropDownButton(dropdownConfig(chatUser2), '#dduser2Menu');
        }
    }, []);
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
    var handleUserTyping = function (args, otherChatUser) {
        if (!args.isTyping) {
            otherChatUser.typingUsers = otherChatUser.typingUsers.filter(function (userItem) { return userItem.user !== args.user.user; });
        }
        else {
            if (!otherChatUser.typingUsers.some(function (userItem) { return userItem.user === args.user.user; })) {
                otherChatUser.typingUsers = __spreadArray(__spreadArray([], otherChatUser.typingUsers, true), [args.user], false);
            }
        }
    };
    var handleMessageSend = function (args, sender) {
        chatUser2Ref.current.suggestions = [];
        if (sender === 'user1') {
            chatUser2Ref.current.messages = __spreadArray(__spreadArray([], chatUser2Ref.current.messages, true), [args.message], false);
        }
        else if (sender === 'user2') {
            chatUser1Ref.current.messages = __spreadArray(__spreadArray([], chatUser1Ref.current.messages, true), [args.message], false);
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section chat-ui" },
            React.createElement("div", { className: "default-chatui" },
                React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { ref: chatUser1Ref, headerText: 'Albert', headerIconCss: "chat_user1_avatar", user: { id: 'user2', user: 'Reena', avatarUrl: './src/chat-ui/images/reena.png' }, messages: data["chatMessagedata"], userTyping: function (args) { return handleUserTyping(args, chatUser2Ref.current); }, headerToolbar: user1ToolbarSettings, messageSend: function (args) { return handleMessageSend(args, 'user1'); } }),
                React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { ref: chatUser2Ref, headerText: 'Reena', headerIconCss: "chat_user2_avatar", user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }, messages: data["chatMessagedata"], suggestions: data["defaultChatSuggestions"], userTyping: function (args) { return handleUserTyping(args, chatUser1Ref.current); }, headerToolbar: user2ToolbarSettings, messageSend: function (args) { return handleMessageSend(args, 'user2'); } }))),
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
exports.default = Default;
