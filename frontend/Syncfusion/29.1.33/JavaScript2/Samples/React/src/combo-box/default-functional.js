"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
require("./default.css");
var data = require("./dataSource.json");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'sportsData';
    // define the JSON of data
    var sportsData = data[temp];
    // maps the appropriate column to fields property
    var fields = { text: 'Game', value: 'Id' };
    var _a = (0, react_1.useState)('Game3'), value = _a[0], setValue = _a[1];
    var _b = (0, react_1.useState)('Basketball'), text = _b[0], setText = _b[1];
    // call the change event's function after initialized the component.
    var onChange = function (args) {
        setValue(args.itemData === null ? 'null' : args.itemData[fields.value].toString());
        setText(args.itemData === null ? 'null' : args.itemData[fields.text].toString());
    };
    return (React.createElement("div", { id: 'combodefault', className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { id: 'default' },
                        React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "games", dataSource: sportsData, fields: fields, change: onChange.bind(_this), placeholder: "Select a game", value: value, popupHeight: "220px" })))),
            React.createElement("div", { id: 'combopanel', className: 'col-lg-4 property-section' },
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
                "This sample demonstrates the default functionalities of the ComboBox. Type a character in the ComboBox element or click the drodown icon to choose an item from the ",
                React.createElement("code", null, "options"),
                " list. The selected item's ",
                React.createElement("code", null, "value"),
                " and ",
                React.createElement("code", null, "text"),
                " property values will be shown in the property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "ComboBox"),
                " component allows the user to type a value, or choose an option from the list of predefined options."),
            React.createElement("p", null,
                " More information on the ComboBox instantiation can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/combo-box/getting-started/", target: "_blank" }, " documentation section"),
                "."))));
};
exports.default = Default;
