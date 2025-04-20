"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // define the array of string
    var records = [];
    for (var i = 1; i <= 150; i++) {
        var item = {};
        item.id = 'id' + i;
        item.text = "Item ".concat(i);
        // Generate a random number between 1 and 4 to determine the group
        var randomGroup = Math.floor(Math.random() * 4) + 1;
        switch (randomGroup) {
            case 1:
                item.group = 'Group A';
                break;
            case 2:
                item.group = 'Group B';
                break;
            case 3:
                item.group = 'Group C';
                break;
            case 4:
                item.group = 'Group D';
                break;
            default:
                break;
        }
        records.push(item);
    }
    var _a = (0, react_1.useState)(null), value = _a[0], setValue = _a[1];
    var _b = (0, react_1.useState)("Selected value : "), objectValue = _b[0], setObjectValue = _b[1];
    var onChange = function (args) {
        setObjectValue("Selected value : " + JSON.stringify(args.value));
    };
    // maps the appropriate column to fields property
    var fields = { text: 'text', value: 'id' };
    // set the value to select an item based on mapped value at initial rendering
    return (React.createElement("div", null,
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { className: "control-wrapper" },
                React.createElement("div", { id: "default", style: { paddingTop: '75px' } },
                    React.createElement(ej2_react_dropdowns_1.MultiSelectComponent, { id: "defaultelement", dataSource: records, mode: "Default", value: value, change: onChange.bind(_this), allowObjectBinding: true, fields: fields, placeholder: "eg Item" })))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement("textarea", { id: "value", className: "auto-dropdowns", title: "Properties", style: { width: '100%', marginTop: '90px', height: '60px' }, value: objectValue, readOnly: true })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the object value binding functionalities of the MultiSelect. Type a character in the MultiSelect element or click on this element to choose one or more items from the suggestion list. The corresponding object value of the selected item is then assigned to the value property.In the property panel, the ",
                React.createElement("code", null, "value"),
                " property of the selected item's will be displayed.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "MultiSelect"),
                " component allows users to select multiple values from a predefined list. Selected items are displayed with default UI modes. Upon selection, the associated object value is automatically assigned to the ",
                React.createElement("code", null, "value"),
                " property, enabled by the ",
                React.createElement("code", null, "allowObjectBinding"),
                " feature."))));
};
exports.default = Default;
