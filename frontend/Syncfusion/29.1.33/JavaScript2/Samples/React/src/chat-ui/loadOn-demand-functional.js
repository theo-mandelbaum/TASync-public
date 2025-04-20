"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./loadOn-demand.css");
var LoadOnDemand = function () {
    var _a = (0, react_1.useState)([]), chatMessages = _a[0], setChatMessages = _a[1];
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        var currentUserModel = {
            id: "user1",
            user: "Albert"
        };
        var michaleUserModel = {
            id: "user2",
            user: "Michale Suyama",
            avatarUrl: './src/chat-ui/images/andrew.png'
        };
        var messages = [];
        var baseDate = new Date();
        baseDate.setDate(baseDate.getDate() - 3);
        var dayIncrement = 24 * 60 * 60 * 1000;
        var authorNames = ["Albert", "Michale"];
        for (var i = 1; i <= 200; i++) {
            if (i % 50 === 1 && i !== 1) {
                // Increment the day only every 50 messages except the very first one
                baseDate = new Date(baseDate.getTime() + dayIncrement);
            }
            var authorIndex = i % 2;
            messages.push({
                text: 'Message ' + i + ' from ' + authorNames[authorIndex],
                author: authorIndex === 0 ? currentUserModel : michaleUserModel,
                timeStamp: new Date((baseDate.getTime() - ((200 * 60 * 1000)) + ((60 * 1000) * i)))
            });
        }
        setChatMessages(messages);
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section chat-ui" },
            React.createElement("div", { className: "loadonDemand-chatui" },
                React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { headerText: 'Michale Suyama', headerIconCss: "chat_user2_avatar", showTimeBreak: true, loadOnDemand: true, user: { id: "user1", user: "Albert" }, messages: chatMessages }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the load on-demand feature of the Chat UI component to render a large number of data's.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the chat ",
                React.createElement("code", null, "messages"),
                " are the list of conversations between two users allowing to scroll through their conversation history. The ",
                React.createElement("code", null, "loadOnDemand"),
                " property allows you to load more messages on demand, improving the performance and reducing load times, particularly in long conversations. Only the visible conversations are render, reducing the amount of DOM elements and improving the overall performance. It highlights the improving performance and reducing load times, particularly in long conversations."))));
};
exports.default = LoadOnDemand;
