"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var data = require("./dataSource.json");
require("./checkbox.css");
var CheckBox = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataA = data["info"];
    var selectionSettings = { showCheckbox: true };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'listbox-selection' },
                React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { dataSource: dataA, selectionSettings: selectionSettings },
                    React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_1.CheckBoxSelection] })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This sample demonstrates the checkbox functionalities of the ListBox. Click one or more items from the list of items in the ListBox.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "ListBox"),
                " component has built-in support to select multiple items from the list. The Checkbox selection can be enabled by setting the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/selectionSettingsModel/#showcheckbox" },
                    React.createElement("code", null, "showCheckbox")),
                " as ",
                React.createElement("code", null, "true"),
                "in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#selectionsettings" },
                    React.createElement("code", null, "selectionSettings")),
                " property."),
            React.createElement("p", null,
                "To perform the checkbox feature in the ListBox, the ",
                React.createElement("code", null, "CheckBoxSelection"),
                " module has to be injected at the application level."),
            React.createElement("p", null,
                "More information about checkbox selection in ListBox can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/", target: "_blank" }, " documentation"),
                " section."))));
};
exports.default = CheckBox;
