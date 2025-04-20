"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./treeview.css");
var dataSource = require("./dataSource/multiSelect-data.json");
var MultiSelect = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.multiSelectData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild', selected: 'isSelected' };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'tree-control_wrapper' },
                React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: fields, allowMultiSelection: true }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                " demonstrates the multiple node selection functionalities of the TreeView. To select multiple nodes, press the CTRL key and select the desired nodes; or select any node and by pressing SHIFT key select another node, this selects all the nodes in-between the selected nodes.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "TreeView"),
                " component allows to select multiple nodes by enabling the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/treeview#allowmultiselection" }, "allowMultiSelection"),
                " property."),
            React.createElement("p", null, "In this demo, the TreeView is enabled with multiple selection"),
            React.createElement("p", null,
                "For more information, refer to the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/multiple-selection/", target: "_blank" }, "Multi Selection"),
                " section from the documentation."))));
};
exports.default = MultiSelect;
