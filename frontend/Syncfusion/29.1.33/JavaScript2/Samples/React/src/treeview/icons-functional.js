"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./icons.css");
var dataSource = require("./dataSource/icons-data.json");
var Icons = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.iconData, id: 'nodeId', text: 'nodeText', child: 'nodeChild', iconCss: 'icon', imageUrl: 'image' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'control_wrapper' },
                React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: "treeview", fields: fields, sortOrder: 'Ascending' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                " demonstrates the node can be configured by icons/images in TreeView. Click on icon or double click on node to expand/collapse it, and show the icons/images that configured with nodes.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "TreeView"),
                " component has the built-in option to customize each node's appearance with the icons and images by mapping the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#iconcss" }, "iconCss"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview/fieldsSettings/#imageurl" }, "imageUrl"),
                " fields."),
            React.createElement("p", null, "In this demo, the TreeView is showcased like a file system with custom icons and images."))));
};
exports.default = Icons;
