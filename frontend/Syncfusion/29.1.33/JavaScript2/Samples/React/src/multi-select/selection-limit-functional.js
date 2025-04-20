"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./checkbox.css");
var data = require("./dataSource.json");
var SelectionLimit = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'countries';
    //define the data with category
    var countries = data[temp];
    // maps the appropriate column to fields property
    var checkFields = { text: 'Name', value: 'Code' };
    var _a = (0, react_1.useState)(3), maximumSelectionLength = _a[0], setMaximumSelectionLength = _a[1];
    var _b = (0, react_1.useState)(null), value = _b[0], setValue = _b[1];
    var applyRange = function () {
        var textBoxValue = parseFloat(document.getElementById('length').value);
        setValue(value === null ? [''] : null);
        setMaximumSelectionLength(textBoxValue);
    };
    return (React.createElement("div", { id: "multichecbox", className: 'control-pane' },
        React.createElement("div", { className: 'control-section col-lg-8' },
            React.createElement("div", { id: "multigroup", className: "control-styles" },
                React.createElement("label", { className: "h4" }, "Selection Limit"),
                React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "checkbox", dataSource: countries, fields: checkFields, placeholder: "Select countries", mode: "CheckBox", value: value, showDropDownIcon: true, maximumSelectionLength: maximumSelectionLength, filterBarPlaceholder: "Search countries", popupHeight: "350px" },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
        React.createElement("div", { className: 'col-lg-4 property-section' },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("div", null, "Selection Limit ")),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: 'length', "aria-label": "number", format: "n0", max: countries.length, value: maximumSelectionLength, min: 1 })))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "buttonApply", cssClass: 'e-btn e-control e-outline', style: { marginBottom: '10px', marginLeft: '100px' }, onClick: applyRange.bind(_this) }, "Apply")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the maximum selection limit functionalities with checkbox of the MultiSelect. MultiSelect value can set restrictions based on the maximum selection length that can be selected.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The MultiSelect has built-in support to limit the value selected in Multiselect component, when the ",
                React.createElement("code", null, "maximumSelectionLength"),
                "property is set as ",
                React.createElement("code", null, "3"),
                ", maximum of only 3 value will be selected in the MultiSelect."),
            React.createElement("p", null, "The selection limit sample illustrates using the countries data."))));
};
exports.default = SelectionLimit;
