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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
exports.API = void 0;
var React = require("react");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var data = require("./messageData.json");
var property_pane_1 = require("../common/property-pane");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.handleSwitchChange = function (property, checked) {
            _this.chatUiInst[property] = checked;
        };
        _this.handleDropDownChange = function (property, value) {
            _this.chatUiInst[property] = value;
        };
        _this.handleMultiSelectChange = function (args, action) {
            var user = { user: args.itemData, avatarBgColor: '#87cefa' };
            if (['Laura', 'Charlie'].includes(args.itemData)) {
                user.avatarBgColor = args.itemData === 'Charlie' ? '#e6cdde' : '#dec287';
                user.avatarUrl = "./src/chat-ui/images/".concat(args.itemData.toLowerCase(), ".png");
            }
            if (action === 'select') {
                _this.chatUiInst.typingUsers = __spreadArray(__spreadArray([], _this.chatUiInst.typingUsers, true), [user], false);
            }
            else {
                _this.chatUiInst.typingUsers = _this.chatUiInst.typingUsers.filter(function (user) { return user.user !== args.itemData; });
            }
        };
        return _this;
    }
    API.prototype.render = function () {
        var _this = this;
        // Parse the date strings in the JSON data to Date objects
        var messages = data["communityMessagedata"].map(function (message) { return (__assign(__assign({}, message), { timeStamp: (message.timeStamp ? new Date(message.timeStamp) : new Date()) })); });
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { className: "api-chatui" },
                    React.createElement(ej2_react_interactive_chat_1.ChatUIComponent, { messages: messages, user: { user: 'Alice', id: 'admin' }, headerIconCss: "chat_header_icon", headerText: "Design Community", showTimeBreak: true, timeStampFormat: "MM/dd hh:mm a" }))),
            React.createElement("div", { className: "col-lg-4 property-section chat-property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Timestamp format")),
                                React.createElement("td", { style: { paddingRight: "10px" } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "chat_dateformats", dataSource: ['MM/dd hh:mm a', 'dd/MM/yy hh:mm a', 'hh:mm a', 'MMMM hh:mm a'], placeholder: "Format", width: "180px", change: function (e) { return _this.handleDropDownChange('timeStampFormat', e.itemData.value); } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show timestamp")),
                                React.createElement("td", { style: { paddingRight: "10px" } },
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "chatTimestamp", checked: true, change: function (e) { return _this.handleSwitchChange('showTimeStamp', e.checked); } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show timebreak")),
                                React.createElement("td", { style: { paddingRight: "10px" } },
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "chatTimebreak", checked: true, change: function (e) { return _this.handleSwitchChange('showTimeBreak', e.checked); } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show header")),
                                React.createElement("td", { style: { paddingRight: "10px" } },
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "chatHeader", checked: true, change: function (e) { return _this.handleSwitchChange('showHeader', e.checked); } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Show footer")),
                                React.createElement("td", { style: { paddingRight: "10px" } },
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "chatFooter", checked: true, change: function (e) { return _this.handleSwitchChange('showFooter', e.checked); } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", null, "Typing users")),
                                React.createElement("td", { style: { paddingRight: "10px" } },
                                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "chat_typingUsers", dataSource: ['Michale', 'Laura', 'Charlie'], placeholder: "Typing users...", select: function (e) { return _this.handleMultiSelectChange(e, 'select'); }, removed: function (e) { return _this.handleMultiSelectChange(e, 'removed'); } }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the properties available in the Chat UI component, showcasing how various features can be customized through the property pane. It highlights the flexibility of the component, allowing users to adjust timestamps, headers, footers, time breaks, and more.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this sample, the following APIs and properties are demonstrated for customization:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "timeStampFormat"),
                        ": Allows users to change the timestamp format by selecting an option from the property pane."),
                    React.createElement("li", null,
                        React.createElement("code", null, "showTimeStamp"),
                        ": components whether the timestamp is displayed in the chat, toggled via the property pane."),
                    React.createElement("li", null,
                        React.createElement("code", null, "showTimeBreak"),
                        ": Enables or disables the display of time breaks in the chat interface."),
                    React.createElement("li", null,
                        React.createElement("code", null, "showHeader"),
                        ": Lets users toggle the visibility of the chat header."),
                    React.createElement("li", null,
                        React.createElement("code", null, "showFooter"),
                        ": Toggles the visibility of the chat footer."),
                    React.createElement("li", null,
                        React.createElement("code", null, "typingUsers"),
                        ": Allows users to manage the list of users who are typing, updated through the multi-select options in the property pane.")),
                React.createElement("p", null, "These properties can be adjusted via the property pane for a highly flexible and customizable chat experience."))));
    };
    return API;
}(sample_base_1.SampleBase));
exports.API = API;
