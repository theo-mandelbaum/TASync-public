"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./template.css");
var dataSource = require("./dataSource/template-data.json");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.templateData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    var cssClass = "template-tree";
    var nodeTemplate = function (data) {
        return (React.createElement("div", null,
            React.createElement("div", { className: "treeviewdiv" },
                React.createElement("div", { className: "textcontent" },
                    React.createElement("span", { className: "treeName" }, data.name)),
                data.count &&
                    React.createElement("div", { className: "countcontainer" },
                        React.createElement("span", { className: "treeCount e-badge e-badge-primary" }, data.count)))));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'tree-control-wrapper' },
                React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: fields, nodeTemplate: nodeTemplate, cssClass: cssClass }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                " demonstrates the template functionalities of the TreeView. Select the root node by clicking on it, or expand the root node and select the customized child node.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "TreeView"),
                " component has an option to customize the node structure through the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview#nodetemplate" }, "nodeTemplate"),
                " property, so that the tree node can be formed with any custom structure."),
            React.createElement("p", null, "In this demo, the node is formed as like webmail with folder name and number of unread messages."),
            React.createElement("p", null,
                "For more information, you can refer to the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/template/", target: "_blank" }, "Templates"),
                " section from the documentation."))));
};
exports.default = Template;
