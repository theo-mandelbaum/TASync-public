"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./default.css");
var dataSource = require("./default-data.json");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var fields = { dataSource: data.defaultData, value: 'id', text: 'name', child: 'subChild' };
    var _a = (0, react_1.useState)(null), value = _a[0], setValue = _a[1];
    var _b = (0, react_1.useState)(null), text = _b[0], setText = _b[1];
    // call the change event's function after initialized the component.
    var onChange = function (args) {
        // update the text and value property values in property panel based on selected item in Dropdown Tree
        setValue(args.value && args.value.length > 0 ? args.value[0] : '');
        setText(args.element.value);
    };
    return (React.createElement("div", { className: 'control-pane dropdowntree-default' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { id: "default" },
                    React.createElement(ej2_react_dropdowns_1.DropDownTreeComponent, { fields: fields, change: onChange.bind(_this), changeOnBlur: false, placeholder: "Select a folder or file", popupHeight: "200px" }))),
            React.createElement("div", { className: 'col-lg-3 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', style: { width: '100%', margin: '10px' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '25%' } }, "Value"),
                                React.createElement("td", null,
                                    ":",
                                    React.createElement("span", { id: 'value', style: { paddingLeft: '10px' } }, value))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '25%' } }, "Text"),
                                React.createElement("td", null,
                                    ":",
                                    React.createElement("span", { id: 'text', style: { paddingLeft: '10px' } }, text)))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample explains you about the default functionalities of the Dropdown Tree component. Click the Dropdown Tree element, and then select an item from the hierarchical structure ",
                React.createElement("code", null, "options"),
                "list. The selected item's ",
                React.createElement("code", null, "value"),
                " and ",
                React.createElement("code", null, "text"),
                " property values will be shown in the property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Dropdown Tree"),
                " component contains a hierarchical structure list of pre-defined values from that the user can choose a single value."),
            React.createElement("p", null,
                "The default sample explains you about the use of Dropdown Tree that allows the end-users to select an item from the hierarchical structure ",
                React.createElement("code", null, "options"),
                " list. The selected item's ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#value" }, "value"),
                " and",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/drop-down-tree/#text" }, "text"),
                " property values will be displayed in the property panel."))));
};
exports.default = Default;
