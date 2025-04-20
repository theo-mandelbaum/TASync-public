"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./treeview.css");
var dataSource = require("./dataSource/nodeEdit-data.json");
var Editing = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.nodeData, id: 'id', text: 'name', child: 'child' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'tree-control_wrapper' },
                React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: fields, allowEditing: true }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                " demonstrates the node editing functionalities of the TreeView. Double click on the node or press F2 key on selected node to edit node's text in input textbox. Press enter key or click outside of the input element to save the node's, or press escape key to cancel the modified text.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "TreeView"),
                " component has the built-in option to edit and modify the node text in inline by enabling the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview#allowediting" }, "allowEditing"),
                " property."),
            React.createElement("p", null,
                "For more information, you can refer to the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/node-editing/", target: "_blank" }, "Node Editing"),
                " section from the documentation."))));
};
exports.default = Editing;
