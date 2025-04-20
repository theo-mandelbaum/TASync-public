"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./checkbox.css");
var CheckBox = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    //define the data with category
    var countries = [
        { Name: 'Australia', Code: 'AU' },
        { Name: 'Bermuda', Code: 'BM' },
        { Name: 'Canada', Code: 'CA' },
        { Name: 'Cameroon', Code: 'CM' },
        { Name: 'Denmark', Code: 'DK' },
        { Name: 'France', Code: 'FR' },
        { Name: 'Finland', Code: 'FI' },
        { Name: 'Germany', Code: 'DE' },
        { Name: 'Greenland', Code: 'GL' },
        { Name: 'Hong Kong', Code: 'HK' },
        { Name: 'India', Code: 'IN' },
        { Name: 'Italy', Code: 'IT' },
        { Name: 'Japan', Code: 'JP' },
        { Name: 'Mexico', Code: 'MX' },
        { Name: 'Norway', Code: 'NO' },
        { Name: 'Poland', Code: 'PL' },
        { Name: 'Switzerland', Code: 'CH' },
        { Name: 'United Kingdom', Code: 'GB' },
        { Name: 'United States', Code: 'US' }
    ];
    // maps the appropriate column to fields property
    var checkFields = { text: 'Name', value: 'Code' };
    // enable or disable the SelectAll in multiselect on CheckBox checked state
    var _a = (0, react_1.useState)(true), showSelectAll = _a[0], setShowSelectAll = _a[1];
    // enable or disable the Dropdown button in multiselect on CheckBox checked state
    var _b = (0, react_1.useState)(true), showDropDownIcon = _b[0], setShowDropDownIcon = _b[1];
    // enable or disable the selection limit in multiselect on CheckBox checked state
    var _c = (0, react_1.useState)(true), enableSelectionOrder = _c[0], setEnableSelectionOrdern = _c[1];
    // function to handle the CheckBox change event
    var onChange = function (args) {
        // enable or disable the SelectAll in multiselect on CheckBox checked state
        setShowSelectAll(args.checked);
    };
    // function to handle the CheckBox change event
    var onChangeDrop = function (args) {
        // enable or disable the Dropdown button in multiselect on CheckBox checked state
        setShowDropDownIcon(args.checked);
    };
    // function to handle the CheckBox change event
    var onChangeLimit = function (args) {
        // enable or disable the selection limit in multiselect on CheckBox checked state
        setEnableSelectionOrdern(args.checked);
    };
    return (React.createElement("div", { id: "multichecbox", className: 'control-pane' },
        React.createElement("div", { className: 'control-section col-lg-8' },
            React.createElement("div", { id: "multigroup", className: "control-styles" },
                React.createElement("label", { className: "h4" }, "CheckBox"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "checkbox", dataSource: countries, fields: checkFields, placeholder: "Select countries", value: null, mode: "CheckBox", showSelectAll: showSelectAll, showDropDownIcon: showDropDownIcon, enableSelectionOrder: enableSelectionOrder, filterBarPlaceholder: "Search countries", popupHeight: "350px" },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
        React.createElement("div", { className: 'col-lg-4 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: showSelectAll, label: 'Show Select All', change: onChange.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: showDropDownIcon, label: 'DropDown Button', change: onChangeDrop.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: enableSelectionOrder, label: 'Selection Reorder', change: onChangeLimit.bind(_this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the checkbox functionalities of the MultiSelect. Click the MultiSelect element and then type a character in the search box. It will display the filtered list items based on the typed characters and then select the multiple values through the checkbox.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiSelect has built-in support to select the multiple values through checkbox, when the ",
                React.createElement("code", null, "mode"),
                " property is set as ",
                React.createElement("code", null, "CheckBox"),
                ". To perform the checkbox feature in MultiSelect, the ",
                React.createElement("code", null, "CheckBoxSelection"),
                " module have to be injected in the application end."),
            React.createElement("p", null,
                "In this sample, the local data is bound to a collection of countries data. Also, provided options for the following:",
                React.createElement("p", null,
                    " To enable/disable ",
                    React.createElement("code", null, "Select All"),
                    "feature in the property panel."),
                React.createElement("p", null,
                    " To enable/disable ",
                    React.createElement("code", null, "DropDown Button"),
                    "feature in the property panel."),
                React.createElement("p", null,
                    " To enable/disable ",
                    React.createElement("code", null, "Selection Reorder"),
                    "feature in the property panel.")),
            React.createElement("p", null, "The checkbox sample illustrates using the countries data. "))));
};
exports.default = CheckBox;
