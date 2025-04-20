"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
require("./checkbox.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var dataSource = require("./checkbox-data.json");
var Checkbox = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.checkboxData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    var showCheckBox = true;
    var _a = (0, react_1.useState)({
        autoCheck: false
    }), treeSettings = _a[0], setTreeSettings = _a[1];
    var onChange = function (args) {
        setTreeSettings({
            autoCheck: args.checked
        });
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-8 control-section dropdowntree-check' },
            React.createElement("div", { className: 'control_wapper' },
                React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: fields, showCheckBox: showCheckBox, mode: "Delimiter", placeholder: "Select items", popupHeight: "200px", treeSettings: treeSettings }))),
        React.createElement("div", { className: 'col-lg-4 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "check", label: 'Auto Check', change: onChange.bind(_this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample explains you about the CheckBox functionalities of the Dropdown Tree. Click on any parent item's CheckBox to check or uncheck the item and its child items. The parent item's checked state will be determined by its child item\u2019s checked state.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Dropdown Tree"),
                " component can be rendered with the checkbox on the left side of each tree item. This allows the user to check more than one item, and this can be enabled by the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#showcheckbox" }, "showCheckBox"),
                "property."),
            React.createElement("p", null, "In this demo, the Dropdown Tree is populated with the checkbox enabled feature."))));
};
exports.default = Checkbox;
