"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./chat-integration.css");
var data = require("./messageData.json");
var ChatIntegration = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chatUiInst = (0, react_1.useRef)(null);
    var listviewInst = (0, react_1.useRef)(null);
    var messages = (0, react_1.useState)(data["integrationMessagedata"])[0];
    var chatMessages = {
        user1: data["integrationMessagedata"],
        admin: data["botMessagedata"],
        user2: data["walterMessagedata"],
        user3: data["lauraMessagedata"],
        team: data["teamsMessagedate"],
        user4: data["suyamaMessagedata"]
    };
    var template = '<div ${if(category!==null)} class = "clearfix desc e-list-wrapper e-list-multi-line e-list-avatar" ${else} ' +
        'class = "clearfix e-list-wrapper e-list-multi-line e-list-avatar" ${/if}> ${if(imgSrc!=="")}' +
        '<img class="e-avatar" src="./src/chat-ui/images/${imgSrc}.png" alt="image" style="border-radius: 50%;"/> ' +
        '${/if} <span class="e-list-item-header">${title} </span>' +
        '${if(message!=="")} <div class="chat_message" style="font-size: 12px;">' +
        '${message} </div> ${/if} </div>';
    var handleSelect = function (args) {
        chatMessages[chatUiInst.current.user.id] = chatUiInst.current.messages;
        chatUiInst.current.suggestions = [];
        setupChatUser(args.index);
        if (args.index >= 0)
            toggleListView();
    };
    var onCreated = function () {
        listviewInst.current.selectItem(data["integrationListTemplateData"][0]);
    };
    var toggleListView = function () {
        var listPopup = document.getElementById('toggle-chat-list');
        if (window.innerWidth < 1200)
            listPopup.style.display = listPopup.style.display === 'none' || listPopup.style.display === '' ? 'block' : 'none';
    };
    var setupChatUser = function (index) {
        var userSettings = [
            { headerText: 'Albert', headerIconCss: 'chat_user1_avatar', user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }, messages: chatMessages.user1 },
            { headerText: 'Decor bot', headerIconCss: 'chat_bot_avatar', user: { id: 'admin', user: 'Admin', avatarUrl: './src/chat-ui/images/bot.png' }, messages: chatMessages.admin, suggestions: data["chatSuggestions"] },
            { headerText: 'Charlie', headerIconCss: 'chat_user2_avatar', user: { id: 'user2', user: 'Charlie', avatarUrl: './src/chat-ui/images/charlie.png' }, messages: chatMessages.user2 },
            { headerText: 'Laura Callahan', headerIconCss: 'chat_user3_avatar', user: { id: 'user3', user: 'Laura', avatarUrl: './src/chat-ui/images/laura.png' }, messages: chatMessages.user3 },
            { headerText: 'New Dev Team', headerIconCss: 'chat_team_avatar', user: { id: 'team', user: 'Admin', avatarUrl: './src/chat-ui/images/calendar.png' }, messages: chatMessages.team },
            { headerText: 'Reena', headerIconCss: 'chat_user4_avatar', user: { id: 'user4', user: 'Albert' }, messages: chatMessages.user4 }
        ];
        Object.assign(chatUiInst.current, userSettings[index]);
        chatUiInst.current.dataBind();
    };
    var handleMessageSend = function (args) {
        chatUiInst.current.suggestions = [];
        setTimeout(function () {
            if (args.message.author.id === 'admin') {
                var foundMessage = data["botData"].find(function (message) { return message.text === args.message.text; });
                var defaultResponse = "Use any real-time data streaming service to provide chat updates.";
                var message = {
                    author: { id: 'bot', user: 'Bot', avatarUrl: './src/chat-ui/images/bot.png' },
                    text: (foundMessage === null || foundMessage === void 0 ? void 0 : foundMessage.reply) || defaultResponse
                };
                chatUiInst.current.addMessage(message);
                chatUiInst.current.suggestions = (foundMessage === null || foundMessage === void 0 ? void 0 : foundMessage.suggestions) || [];
            }
        }, 500);
    };
    var userToolbarSettings = {
        items: [
            { iconCss: 'chat-icon-phone-call', align: 'Right', tooltip: 'Audio call' }
        ]
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section chat-integration" },
            React.createElement("div", { className: "integration-chatui" },
                React.createElement(ej2_react_layouts_1.SplitterComponent, { paneSettings: [{ size: 'auto', resizable: false, cssClass: "chat-leftContent" }, { size: '80%', resizable: false, cssClass: "chat-rightContent" }], created: function () { onCreated(); } },
                    React.createElement("div", { id: "buttonsPane" },
                        React.createElement("div", { className: "chat-options-container" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { iconCss: "e-icons e-stamp", cssClass: "e-flat chat_options", iconPosition: "Top" },
                                React.createElement("span", null, "Activity")),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { iconCss: "e-icons e-comment-show", cssClass: "e-flat chat_options chat_interactable", iconPosition: "Top", style: { borderLeft: '2px solid #0f6cbd' }, onClick: toggleListView },
                                React.createElement("span", null, "Chat")),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { iconCss: "e-icons e-month", cssClass: "e-flat chat_options", iconPosition: "Top" },
                                React.createElement("span", null, "Calendar")),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { iconCss: "e-icons e-people", cssClass: "e-flat chat_options", iconPosition: "Top" },
                                React.createElement("span", null, "Teams"))),
                        React.createElement("div", { id: "toggle-chat-list", className: "toggle-chat-listview e-card" },
                            React.createElement("div", { id: "listview_template", tabIndex: 1, style: { border: 'none' } },
                                React.createElement(ej2_react_lists_1.ListViewComponent, { ref: listviewInst, dataSource: data["integrationListTemplateData"], template: template, headerTitle: "Chats", cssClass: "e-list-template", showHeader: true, select: function (args) { handleSelect(args); } })))),
                    React.createElement("div", { id: "integration-chat" },
                        React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { id: "integration-chat", style: { border: 'none' }, ref: chatUiInst, headerText: "Albert", headerIconCss: "chat_user1_avatar", messages: messages, user: { id: 'user1', user: 'Albert', avatarUrl: './src/chat-ui/images/andrew.png' }, headerToolbar: userToolbarSettings, messageSend: function (args) { handleMessageSend(args); } }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates how to design a chat application using the Chat UI component, with dynamic switching between users' messages. The Chat UI component is customized using various properties and includes a header toolbar for additional functionality.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "This example demonstrates how to use the Chat UI component to display chat messages for multiple users. The chat interface allows switching between users' conversations, with bot responses triggered by user input. A header toolbar is included, and a splitter layout displays the chat alongside a list view for easy navigation."),
            React.createElement("p", null, "The chat UI dynamically updates to reflect the selected user's conversation, providing an interactive experience with seamless switching between different chats. The responsive design ensures that the interface adapts to various screen sizes, making it user-friendly across devices."))));
};
exports.default = ChatIntegration;
