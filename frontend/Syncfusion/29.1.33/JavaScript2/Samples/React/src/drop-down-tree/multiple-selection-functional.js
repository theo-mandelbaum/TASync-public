"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./multiple-selection.css");
var dataSource = require("./multiSelect-data.json");
var MultiSelect = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.multiSelectData, value: 'id', parentValue: 'pid', text: 'name', hasChildren: 'hasChild' };
    var allowMultiSelection = true;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section dropdowntree-multi' },
            React.createElement("div", { className: 'control_wapper' },
                React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: fields, allowMultiSelection: allowMultiSelection, placeholder: "Select items", popupHeight: "200px" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample explains you about the multiple item selection functionalities of the Dropdown Tree. To select multiple items, you may press and hold the CTRL key and then select the desired items; or select any item by selecting it and then press and hold the SHIFT key to select a range of items continuously.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Dropdown Tree"),
                " component allows you to select multiple items by enabling the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree#allowmultiselection" }, "allowMultiSelection"),
                " property."),
            React.createElement("p", null, "In this demo, the Dropdown Tree is enabled with multiple selection."))));
};
exports.default = MultiSelect;
