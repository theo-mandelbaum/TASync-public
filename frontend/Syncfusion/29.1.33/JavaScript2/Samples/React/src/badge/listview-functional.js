"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
require("./listview.css");
var listData_1 = require("./listData");
var ListView = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Map fields
    var fields = { groupBy: 'type' };
    var listTemplate = function (data) {
        return (React.createElement("div", { className: 'listWrapper', style: { width: 'inherit', height: 'inherit' } },
            React.createElement("span", { className: "".concat(data.icons, " list_svg") }, "\u00A0"),
            React.createElement("span", { className: 'list_text' }, data.text),
            React.createElement("span", { className: data.badge }, data.messages)));
    };
    var onActionComplete = function () {
        var list = document.getElementById('lists').getElementsByClassName('e-list-group-item')[0];
        list.style.display = 'none';
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section badge-samples' },
            React.createElement("div", { className: "sample_container badge-list" },
                React.createElement(ej2_react_lists_1.ListViewComponent, { id: "lists", dataSource: listData_1.dataSource, fields: fields, headerTitle: 'Inbox', showHeader: true, template: listTemplate, actionComplete: onActionComplete.bind(_this) }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the integration of badges into the listview component to display the new e-mails count.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The badge can be integrated into the listview with the help of templates. The listview uses so many real-time use cases with badges to achieve different applications."),
            React.createElement("p", null, "Here, default badges are used and there is no need to customize the badge size because the component will automatically adjust the size based on the container element."),
            React.createElement("p", null, "In this samples, different types of colors are used to indicate their priorities of the notification."))));
};
exports.default = ListView;
