"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lists_1 = require("@syncfusion/ej2-react-lists");
var sample_base_1 = require("../common/sample-base");
require("./listview.css");
var datasource_1 = require("./datasource");
// *  Sample for CSS avatar component
var Listview = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Set customized list template
    var listTemplate = function (data) {
        var letterAvatar = React.createElement("span", { className: 'e-avatar e-avatar-small e-avatar-circle' }, data.avatar);
        var imageAvatar = React.createElement("span", { className: "".concat(data.pic, " e-avatar e-avatar-small e-avatar-circle") });
        return (React.createElement("div", { className: 'listWrapper' },
            data.avatar !== "" ? (letterAvatar) : (imageAvatar),
            React.createElement("span", { className: 'list-text' }, data.text)));
    };
    return (React.createElement("div", { className: 'control-pane', style: { marginTop: "10px" } },
        React.createElement("div", { className: "sample_container listview" },
            React.createElement(ej2_react_lists_1.ListViewComponent, { id: 'letterAvatarList', dataSource: datasource_1.listData, headerTitle: 'Contacts', showHeader: true, sortOrder: "Ascending", template: listTemplate })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the integration of avatar component into listview to create contacts applications.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The avatar can be used with other components to create various applications. Here, the avatar is used to display images or their initials from the persons contact lists."),
            React.createElement("p", null,
                "Here, the xsmall avatar is used in circle type. To change the size of the avatar to xsmall and circle style, add",
                React.createElement("code", null, ".e-avatar-xsmall"),
                " and",
                React.createElement("code", null, ".e-avatar-circle"),
                "."))));
};
exports.default = Listview;
