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
exports.LoadOnDemand = void 0;
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./loadOn-demand.css");
var LoadOnDemand = /** @class */ (function (_super) {
    __extends(LoadOnDemand, _super);
    function LoadOnDemand(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            chatMessages: [] // Initialize chatMessages as an empty array
        };
        return _this;
    }
    LoadOnDemand.prototype.componentDidMount = function () {
        this.currentUserModel = {
            id: "user1",
            user: "Albert"
        };
        this.michaleUserModel = {
            id: "user2",
            user: "Michale Suyama",
            avatarUrl: './src/chat-ui/images/andrew.png'
        };
        var chatMessages = [];
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
            chatMessages.push({
                text: 'Message ' + i + ' from ' + authorNames[authorIndex],
                author: authorIndex === 0 ? this.currentUserModel : this.michaleUserModel,
                timeStamp: new Date((baseDate.getTime() - ((200 * 60 * 1000)) + ((60 * 1000) * i)))
            });
        }
        this.setState({ chatMessages: chatMessages });
    };
    LoadOnDemand.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section chat-ui" },
                React.createElement("div", { className: "loadonDemand-chatui" },
                    React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { headerText: 'Michale Suyama', headerIconCss: "chat_user2_avatar", showTimeBreak: true, loadOnDemand: true, user: this.currentUserModel, messages: this.state.chatMessages }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the load on-demand feature of the Chat UI component to render a large number of data's.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, the chat ",
                    React.createElement("code", null, "messages"),
                    " are the list of conversations between two users allowing to scroll through their conversation history. The ",
                    React.createElement("code", null, "loadOnDemand"),
                    " property allows you to load more messages on demand, improving the performance and reducing load times, particularly in long conversations. Only the visible conversations are render, reducing the amount of DOM elements and improving the overall performance.It highlights the improving performance and reducing load times, particularly in long conversations."))));
    };
    return LoadOnDemand;
}(sample_base_1.SampleBase));
exports.LoadOnDemand = LoadOnDemand;
