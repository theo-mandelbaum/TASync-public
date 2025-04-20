"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_kanban_1 = require("@syncfusion/ej2-react-kanban");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./datasource.json");
require("./workflow.css");
/**
 * Kanban Workflow sample
 */
var Workflow = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = (0, ej2_base_1.extend)([], dataSource.kanbanPizzaData, null, true);
    var cardTemplate = function (props) {
        var src = "src/kanban/images/" + props.ImageURL;
        return (React.createElement("div", { className: "card-template" },
            React.createElement("div", { className: "e-card-header" },
                React.createElement("div", { className: "e-card-header-caption" },
                    React.createElement("div", { className: "e-card-header-title e-tooltip-text" }, props.Title))),
            React.createElement("div", { className: "e-card-content e-tooltip-text" },
                React.createElement("div", { className: "e-text" }, props.Description),
                React.createElement("div", { className: "e-card-kanban-image" },
                    React.createElement("img", { src: src, alt: "" }))),
            React.createElement("div", { className: "e-card-custom-footer" }, props.Tags.split(",").map(function (tag) { return (React.createElement("div", { className: "e-card-tag-field" }, tag)); }))));
    };
    return (React.createElement("div", { className: "kanban-control-section" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement(ej2_react_kanban_1.KanbanComponent, { cssClass: "kanban-workflow", id: "kanban", keyField: "Category", dataSource: data, cardSettings: {
                        headerField: "Id",
                        contentField: "Description",
                        template: cardTemplate.bind(_this),
                    } },
                    React.createElement(ej2_react_kanban_1.ColumnsDirective, null,
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Order", keyField: "Order", transitionColumns: ["Ready to Serve", "Ready to Deliver"], allowToggle: true, allowDrop: false }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Ready to Serve", keyField: "Ready to Serve", allowToggle: true, transitionColumns: ["Served"] }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Home Delivery", keyField: "Ready to Deliver", allowToggle: true, transitionColumns: ["Delivered"] }),
                        React.createElement(ej2_react_kanban_1.ColumnDirective, { headerText: "Delivered", keyField: "Delivered,Served", allowToggle: true, allowDrag: false }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the workflow functionalities that defines the flow of transition between the columns. You can drag and drop the cards between Kanban columns to see the workflow restriction.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this sample, you can drag the cards from the `Order` column and drop them into `Ready to Serve` and `Home Delivery` columns. Also, you couldn\u2019t drag the cards from the `Delivered` column and drop the cards in the `Order` column. The action is controlled using the below properties."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "The ",
                    React.createElement("code", null, "transitionColumns"),
                    " property is used to allow the card transition to specified columns."),
                React.createElement("li", null,
                    "The ",
                    React.createElement("code", null, "allowDrag"),
                    " property is used to enable/disable the drag action of columns."),
                React.createElement("li", null,
                    "The ",
                    React.createElement("code", null, "allowDrop"),
                    " property is used to enable/disable the drop action of columns.")))));
};
exports.default = Workflow;
