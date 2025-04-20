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
exports.Default = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var data = require("./dataSource.json");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'emailData';
        _this.emailData = data[_this.temp];
        _this.emailFields = { text: 'EmailId' };
        _this.commentTarget = '#commentsMention';
        _this.commentFields = { text: 'Name' };
        return _this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { id: 'mention_default' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { className: "default-size" }, "Comments"),
                                        React.createElement("div", { id: "commentsMention", placeholder: "Type @ and tag user" }))))),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: this.emailData, target: this.commentTarget, fields: this.commentFields })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the default functionalities of the Mention component. Type the ",
                    React.createElement("code", null, "@"),
                    " character in the editable element and select or tag the user from the suggestion list.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Mention"),
                    " is a component used to display a list of items that the users can select or tag from the list suggested. You can use the ",
                    React.createElement("code", null, "@"),
                    " mention support with the ",
                    React.createElement("code", null, "input"),
                    ", ",
                    React.createElement("code", null, "textarea"),
                    ", and ",
                    React.createElement("code", null, "contenteditable"),
                    " div elements."),
                React.createElement("p", null,
                    "In the above sample, the div elements are configured with ",
                    React.createElement("code", null, "@"),
                    " mentions listing the ",
                    React.createElement("code", null, "comments"),
                    " contents."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
