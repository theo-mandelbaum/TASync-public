"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var data = require("./dataSource.json");
require("./dual-list-box.css");
var DualListBox = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dataA = data["groupa"];
    var dataB = data["groupb"];
    var fields = { text: 'Name' };
    var toolbarSettings = { items: ['moveUp', 'moveDown', 'moveTo', 'moveFrom', 'moveAllTo', 'moveAllFrom'] };
    var noRecordsTemplate = '<div class= "e-list-nrt"><span>NO DATA AVAILABLE</span></div>';
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "dual-list-wrapper" },
                React.createElement("div", { className: "dual-list-groupa" },
                    React.createElement("h4", null, "Group A"),
                    React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { dataSource: dataA, fields: fields, height: "330px", scope: "#combined-listbox", toolbarSettings: toolbarSettings, noRecordsTemplate: noRecordsTemplate })),
                React.createElement("div", { className: "dual-list-groupb" },
                    React.createElement("h4", null, "Group B"),
                    React.createElement(ej2_react_dropdowns_1.ListBoxComponent, { id: "combined-listbox", dataSource: dataB, height: "330px", fields: fields, noRecordsTemplate: noRecordsTemplate })))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null,
                "This sample demonstrates the functionalities of the dual list box. Select an item from Group A and click the ",
                React.createElement("code", null, "moveTo"),
                " button to move item from Group A to Group B.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The dual list box allows the user to move items between two list boxes. Dual list box can be created by listing items in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#toolbarsettings" },
                    React.createElement("code", null, "toolbarSettings")),
                " property along with",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/list-box/#scope" },
                    React.createElement("code", null, "scope")),
                " property. The supported operations are,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "moveUp"),
                    " -  Moves the selected item in the upward direction."),
                React.createElement("li", null,
                    React.createElement("code", null, "moveDown"),
                    " -  Moves the selected item in the downward direction."),
                React.createElement("li", null,
                    React.createElement("code", null, "moveTo"),
                    " -  Moves the selected item to the Group B list box."),
                React.createElement("li", null,
                    React.createElement("code", null, "moveFrom"),
                    " -  Moves the selected item from Group B list box to Group A."),
                React.createElement("li", null,
                    React.createElement("code", null, "moveAllTo"),
                    " -  Moves all the items to the Group B list box."),
                React.createElement("li", null,
                    React.createElement("code", null, "moveAllFrom"),
                    " -  Moves all the items from Group B list box to Group A.")),
            React.createElement("p", null,
                " More information about the dual list box can be found in the",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/list-box/", target: "_blank" }, " documentation"),
                " section."))));
};
exports.default = DualListBox;
