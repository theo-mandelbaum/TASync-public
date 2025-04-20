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
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
require("./template.css");
// *  Template Sample for Timeline component
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.gitHubRoadmap = [
            { icon: "sf-icon-commit", message: "Created 10 commits in 5 repositories" },
            { icon: "sf-icon-create", message: "Created 1 repository" },
            { icon: "sf-icon-pull", message: "Created a pull request in <u>organization/new-control-roadmap</u>" },
            { icon: "sf-icon-review", message: "Reviewed 3 pull requests in 2 repositories" }
        ];
        _this.timelineItems = _this.gitHubRoadmap.map(function (_a) {
            var icon = _a.icon, message = _a.message;
            return ({
                dotCss: icon,
                content: message
            });
        });
        _this.getTemplate = function (props) {
            return (React.createElement("div", { className: 'template-container' },
                React.createElement("div", { className: "progress-line" },
                    React.createElement("span", { className: "indicator ".concat(props.item.dotCss) })),
                React.createElement("div", { className: "timeline-content" },
                    React.createElement("div", { className: "content-container" },
                        React.createElement("span", { dangerouslySetInnerHTML: { __html: props.item.content } }),
                        React.createElement("span", { className: "e-icons e-more-vertical-1" })),
                    props.itemIndex == 1 &&
                        (React.createElement("div", { className: "content-container" },
                            React.createElement("span", { className: "e-icons e-lock" },
                                "\u00A0 ",
                                React.createElement("span", { className: "repo-name" }, "Author/Getting-started-with-new-control")),
                            React.createElement("div", null,
                                React.createElement("div", { className: "mini-circle" }),
                                React.createElement("span", { className: "mini-text" }, "JavaScript")),
                            React.createElement("span", { className: "mini-text" }, " Feb 15 "))),
                    props.itemIndex == 2 &&
                        (React.createElement("div", { className: "mention-group" },
                            React.createElement("svg", { className: "color-pr", viewBox: "0 0 16 16", version: "1.1", width: "16", height: "16", "aria-hidden": "true" },
                                React.createElement("path", { d: "M5.45 5.154A4.25 4.25 0 0 0 9.25 7.5h1.378a2.251 2.251 0 1 1 0 1.5H9.25A5.734 5.734 0 0 1 5 7.123v3.505a2.25 2.25 0 1 1-1.5 0V5.372a2.25 2.25 0 1 1 1.95-.218ZM4.25 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm8.5-4.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM5 3.25a.75.75 0 1 0 0 .005V3.25Z" })),
                            React.createElement("div", { className: "mention-content" },
                                React.createElement("p", { style: { fontWeight: "bold" } }, " 87231 - Updated Roadmap for new control "),
                                React.createElement("span", null, " Updated new control roadmap "),
                                React.createElement("div", { className: "diffstats" },
                                    React.createElement("span", { className: "color-success" }, " +95 "),
                                    React.createElement("span", { className: "color-danger" }, " -17 "),
                                    React.createElement("span", null,
                                        React.createElement("span", { className: "diff-block added" }),
                                        React.createElement("span", { className: "diff-block added" }),
                                        React.createElement("span", { className: "diff-block added" }),
                                        React.createElement("span", { className: "diff-block added" }),
                                        React.createElement("span", { className: "diff-block neutral" }),
                                        "lines changed"))))))));
        };
        return _this;
    }
    Template.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { className: "timeline-template-section" },
                    React.createElement(ej2_react_layouts_1.TimelineComponent, { cssClass: "custom-timeline", template: this.getTemplate },
                        React.createElement(ej2_react_layouts_1.ItemsDirective, null, this.timelineItems.map(function (item, index) {
                            return React.createElement(ej2_react_layouts_1.ItemDirective, { key: index, dotCss: item.dotCss, content: item.content });
                        }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the template functionality of the Timeline component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, we showcase repository activities by customizing each item using the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/timeline#template", target: "_blank" }, "template"),
                    " property. It allows to create unique appearances for items, including the connector, dot container, and contents."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
