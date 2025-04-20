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
exports.Accordion = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./accordion.css");
var Accordion = /** @class */ (function (_super) {
    __extends(Accordion, _super);
    function Accordion() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.accordionData = [
            { name: 'Robert', badge: '7 New' },
            { name: 'Kevin', badge: '27 New' },
            { name: 'Eric', badge: '2 New' },
            { name: 'Peter', badge: '14 New' }
        ];
        return _this;
    }
    Accordion.prototype.accordionTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("ul", null,
                React.createElement("li", { className: 'msg' },
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon people' }),
                    "Message Thread"),
                React.createElement("li", { className: 'msg' },
                    React.createElement("span", { className: 'e-acrdn-icons e-content-icon people' }),
                    "Message Thread"))));
    };
    Accordion.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section badge-samples' },
                React.createElement("div", { className: "sample_container badge-accordion" },
                    React.createElement(ej2_react_navigations_1.AccordionComponent, { id: "accordion" },
                        React.createElement(ej2_react_navigations_1.AccordionItemsDirective, null, this.accordionData.map(function (item, index) { return (React.createElement(ej2_react_navigations_1.AccordionItemDirective, { key: index, header: function () { return (React.createElement("div", null,
                                React.createElement("span", null, item.name),
                                React.createElement("span", { className: "e-badge e-badge-success" }, item.badge))); }, iconCss: 'e-people e-acrdn-icons', expanded: index === 0, content: _this.accordionTemplate })); }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the integration of badges into the accordion component to display the thread notification count.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The badge can be integrated into the accordion with the help of templates to display the count of new messages in the message thread. Here, the success badge is used in the accordion. To add success badge, add the",
                    React.createElement("code", null, ".e-badge-success"),
                    " class."))));
    };
    return Accordion;
}(sample_base_1.SampleBase));
exports.Accordion = Accordion;
