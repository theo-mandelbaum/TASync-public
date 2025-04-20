"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
require("./treeview.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var dataSource = require("./dataSource/checkbox-data.json");
var Checkbox = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isAutoCheck = _a[0], setIsAutoCheck = _a[1];
    var data = dataSource;
    var fields = { dataSource: data.checkboxData, id: 'id', parentID: 'pid', text: 'name', hasChildren: 'hasChild' };
    var onChange = function (args) {
        setIsAutoCheck(args.checked);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-8 control-section' },
            React.createElement("div", { className: 'tree-control_wrapper' },
                React.createElement(ej2_react_navigations_1.TreeViewComponent, { fields: fields, showCheckBox: true, autoCheck: isAutoCheck }))),
        React.createElement("div", { className: 'col-lg-4 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "check", checked: true, label: 'Auto Check', change: onChange.bind(_this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-treeview", target: "_blank" }, "React TreeView example"),
                " demonstrates the CheckBox functionalities of the TreeView. Click on any parent node's CheckBox to check/uncheck the node and its child nodes. The parent node's checked state will be determined by its child nodes checked state.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "TreeView"),
                " component can be rendered with checkbox on the left side of each tree node. This allows the user to check more than one nodes, and this can be enabled by the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/treeview#showcheckbox", target: "_blank" }, "showCheckBox"),
                " property."),
            React.createElement("p", null, "In this demo, the TreeView is populated with checkbox enabled."),
            React.createElement("p", null,
                "For more information, you can refer to the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/treeview/check-box/", target: "_blank" }, "Checkboxes"),
                " section from the documentation."))));
};
exports.default = Checkbox;
