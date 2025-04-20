"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./default.css");
var data = require("./dataSource.json");
var DiacriticsFiltering = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var temp = 'data';
    var diacriticsData = data[temp];
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'default' },
                React.createElement(ej2_react_dropdowns_1.ComboBoxComponent, { id: "diacritics", ignoreAccent: true, allowFiltering: true, dataSource: diacriticsData, placeholder: "e.g: gul" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the diacritics filter functionality of the ComboBox. Type the characters \u2018gul\u2019 in the ComboBox element and it displays the suggestion list ignoring the diacritics lists.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ComboBox filtering will ignore the ",
                React.createElement("a", { href: "https://en.wikipedia.org/wiki/Diacritic", target: "_blank" }, " diacritics "),
                " which makes it easier to filter the results in international characters lists when the ",
                React.createElement("code", null, "ignoreAccent"),
                " is enabled."),
            React.createElement("p", null, "This sample illustrates the international characters data."))));
};
exports.default = DiacriticsFiltering;
