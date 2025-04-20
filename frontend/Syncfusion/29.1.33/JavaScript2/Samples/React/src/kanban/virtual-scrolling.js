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
exports.VirtualScrolling = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
require("./virtual-scrolling.css");
/**
 * Kanban Virtual Scrolling sample
 */
var VirtualScrolling = /** @class */ (function (_super) {
    __extends(VirtualScrolling, _super);
    function VirtualScrolling() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VirtualScrolling.prototype.generateKanbanDataVirtualScrollData = function () {
        var kanbanData = [];
        var BUG_TASKS = [
            'UI component not displaying images in IE browser',
            'Button not responding on hover action',
            'Text overlapping in mobile view',
            'Dropdown menu not functioning properly',
            'Form validation error',
            'Alignment issue in tables',
            'Column not loading completely',
            'Broken UI Designs',
            'Font size inconsistency',
            'UI element misaligned on scroll'
        ];
        var FEATURE_TASKS = [
            'Implement new user registration flow',
            'Add pagination to search results',
            'Improve accessibility for visually impaired users',
            'Create custom dashboard for users',
            'Develop user profile editing functionality',
            'Integrate with third-party API for weather data',
            'Implement social media sharing for articles',
            'Add support for multiple languages',
            'Create onboarding tutorial for new users',
            'Implement push notifications for mobile app'
        ];
        var EPIC_TASKS = [
            'Revamp UI design for entire application',
            'Develop mobile application for iOS and Android',
            'Create API for integration with external systems',
            'Implement machine learning algorithms for personalized recommendations',
            'Upgrade database infrastructure for scalability',
            'Integrate with payment gateway for subscription model',
            'Develop chatbot for customer support',
            'Implement real-time collaboration features for team projects',
            'Create analytics dashboard for administrators',
            'Introduce gamification elements to increase user engagement',
        ];
        var assignee = ['Andrew Fuller', 'Janet Leverling', 'Steven walker', 'Robert King', 'Margaret hamilt', 'Nancy Davloio', 'Margaret Buchanan', 'Laura Bergs', 'Anton Fleet', 'Jack Kathryn', 'Martin Davolio', 'Fleet Jack'];
        var status = ['Open', 'InProgress', 'Review', 'Testing', 'Close'];
        var priority = ['Ultra-Critical', 'Critical', 'High', 'Normal', 'Low'];
        var types = ['Epic', 'Bug', 'Story'];
        var tagsField = ['Feature', 'Bug', 'Enhancement', 'Documentation', 'Automation', 'Mobile', 'Web', 'iOS', 'Safari', 'Chrome', 'Firefox', 'Manual Testing'];
        var storyPoints = ['1', '2', '3', '3.5', '4', '4.5', '5', '6', '7.5', '8'];
        var count = 600000;
        for (var a = 500000, id = 500000; a < count; a++) {
            var typeValue = types[Math.floor(Math.random() * types.length)];
            var summary = typeValue === 'Bug' ? BUG_TASKS[Math.floor(Math.random() * BUG_TASKS.length)] :
                typeValue === 'Story' ? FEATURE_TASKS[Math.floor(Math.random() * FEATURE_TASKS.length)] :
                    EPIC_TASKS[Math.floor(Math.random() * EPIC_TASKS.length)];
            kanbanData.push({
                Id: id,
                Type: typeValue,
                Priority: priority[Math.floor(Math.random() * priority.length)],
                Status: status[Math.floor(Math.random() * status.length)],
                Assignee: assignee[Math.floor(Math.random() * assignee.length)],
                StoryPoints: storyPoints[Math.floor(Math.random() * storyPoints.length)],
                Tags: [tagsField[Math.floor(Math.random() * tagsField.length)], tagsField[Math.floor(Math.random() * tagsField.length)]],
                Title: 'Task ' + id,
                Summary: summary,
            });
            id++;
        }
        return kanbanData;
    };
    VirtualScrolling.prototype.onCardRendered = function (args) {
        var val = (args.data).Priority.toLowerCase();
        (0, ej2_base_1.addClass)([args.element], val);
    };
    VirtualScrolling.prototype.cardTemplate = function (props) {
        return (React.createElement("div", null,
            React.createElement("div", { className: 'e-card-header' },
                React.createElement("div", { className: 'e-card-header-caption' },
                    React.createElement("div", { className: 'e-text e-card-header-title e-tooltip-text' }, props.Summary))),
            React.createElement("div", { className: 'e-card-footer' },
                React.createElement("div", { className: 'e-link-wrapper ' },
                    React.createElement("span", { className: 'e-' + props.Type.toLowerCase(), title: props.Type }),
                    React.createElement("a", { className: 'e-custom-link' },
                        React.createElement("span", { className: 'e-project' }, "TASK- "),
                        React.createElement("span", { className: 'e-card-footer-text' }, props.Id))),
                React.createElement("div", { className: 'e-custom-wrapper' },
                    React.createElement("div", { className: 'e-story-points-wrapper' },
                        React.createElement("div", { className: 'e-story-points', title: 'Story Point' }, props.StoryPoints)),
                    React.createElement("div", { className: 'e-priority e-' + props.Priority.toLowerCase() + '-icon', title: props.Priority }),
                    React.createElement("div", { className: 'e-card-avatar', title: props.Assignee },
                        " ",
                        props.Assignee.match(/\b(\w)/g).join('').toUpperCase())))));
    };
    VirtualScrolling.prototype.render = function () {
        return (React.createElement("div", { className: 'kanban-control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'control-wrapper' },
                    React.createElement(ej2_react_kanban_1.KanbanComponent, { id: "KanbanVirtualScrolling", enableVirtualization: true, keyField: "Status", dataSource: this.generateKanbanDataVirtualScrollData(), enableTooltip: true, cardSettings: { headerField: "Id", selectionType: 'Multiple', template: this.cardTemplate.bind(this) }, dialogSettings: {
                            fields: [
                                { key: 'Id', text: 'ID', type: 'TextBox' },
                                { key: 'Status', text: 'Status', type: 'DropDown' },
                                { key: 'StoryPoints', text: 'Story Points', type: 'Numeric' },
                                { key: 'Summary', text: 'Summary', type: 'TextArea' }
                            ]
                        }, cardRendered: this.onCardRendered.bind(this) },
                        React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "To Do", keyField: "Open" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "In Progress", keyField: "InProgress" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Code Review", keyField: "Review" }),
                            React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Done", keyField: "Close" }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Kanban board with the virtual scrolling feature. It configures a large dataset as the data source, allowing smooth navigation and rendering of a significant amount of data while scrolling through Kanban columns.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Kanban board UI virtualization feature allows for rendering the column cards that are visible within the viewport, without buffering the entire data source. To enable virtualization, you can set the ",
                    React.createElement("code", null, "enableVirtualization"),
                    " property to true."),
                React.createElement("p", null,
                    "In this demo, a dataset of 100K items has been configured for the ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/kanban/#datasource" },
                        React.createElement("code", null, "dataSource")),
                    "property. Despite the large dataset, the Kanban board efficiently handles the rendering and interaction, ensuring a smooth user experience. Users can seamlessly navigate and interact with the Kanban board, even with such a significant amount of data."))));
    };
    return VirtualScrolling;
}(sample_base_1.SampleBase));
exports.VirtualScrolling = VirtualScrolling;
