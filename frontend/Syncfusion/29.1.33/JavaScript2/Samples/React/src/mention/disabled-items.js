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
exports.DisabledItems = void 0;
var React = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./disabled-items.css");
var data = require("./dataSource.json");
var DisabledItems = /** @class */ (function (_super) {
    __extends(DisabledItems, _super);
    function DisabledItems() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.temp = 'emailData2';
        _this.emailData = data[_this.temp];
        _this.disabledTarget = '#disabledMention';
        _this.disabledFields = { text: 'Name', disabled: 'State' };
        return _this;
    }
    DisabledItems.prototype.itemTemplate = function (data) {
        return (React.createElement("div", { className: "disabled_listItems" },
            React.createElement("img", { className: "mentionEmpImage", src: "src/mention/Employees/" + data['Eimg'] + ".png", alt: "employee" }),
            React.createElement("span", { className: "person" }, data.Name),
            React.createElement("span", { className: "email" }, data.EmailId)));
    };
    DisabledItems.prototype.displayTemplate = function (data) {
        return (React.createElement(React.Fragment, null, data.Name));
    };
    DisabledItems.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { id: 'mention_disabled' },
                        React.createElement("table", null,
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("label", { className: "disabled-size" }, "Compose your content"),
                                        React.createElement("div", { id: "disabledMention", placeholder: "Type @ and tag user" }))))),
                        React.createElement(ej2_react_dropdowns_1.MentionComponent, { dataSource: this.emailData, target: this.disabledTarget, fields: this.disabledFields, itemTemplate: this.itemTemplate, displayTemplate: this.displayTemplate, noRecordsTemplate: "No item related to the search", popupWidth: 250, popupHeight: 200 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample showcases the disabled items of the Mention component. Type the ",
                    React.createElement("code", null, "@"),
                    " character in the editable element and you will notice that the disabled items are greyed out and cannot be selected.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Mention provides options for individual items to be in either an enabled or disabled state for specific scenarios. Once an item is disabled, it cannot be select a particular item. To configure the disabled item columns, use the ",
                    React.createElement("b", null, "fields.disabled"),
                    " property."))));
    };
    return DisabledItems;
}(sample_base_1.SampleBase));
exports.DisabledItems = DisabledItems;
