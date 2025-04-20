"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_dropdowns_2 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var dataSource = require("./menu-data.json");
var Api = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var data = dataSource;
    var _a = (0, react_1.useState)({
        orientation: 'Horizontal',
        showItemOnClick: false
    }), state = _a[0], setState = _a[1];
    var menuRef = (0, react_1.useRef)(null);
    // Menu fields definition
    var menuFields = { text: ['header', 'text', 'value'], children: ['subItems', 'options'] };
    var modeChange = function (args) {
        setState(__assign(__assign({}, state), { orientation: args.itemData.value }));
    };
    var enabledisableChange = function (args) {
        if (args.value) {
            var menuObj = menuRef.current;
            menuObj.enableItems(['Events', 'Movies', 'Directory', 'Queries', 'Services'], true);
            menuObj.enableItems(args.value, false);
        }
    };
    // CheckBox change event
    var showOnClickChange = function (args) {
        setState(__assign(__assign({}, state), { showItemOnClick: args.checked }));
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "menu-section control-section" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement("div", { id: "apiMenu" },
                    React.createElement(ej2_react_navigations_1.MenuComponent, { id: "menu", items: data.apiData, fields: menuFields, orientation: state.orientation, showItemOnClick: state.showItemOnClick, ref: menuRef }))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", null, "Orientation")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", { style: { maxWidth: '200px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { value: 'Horizontal', dataSource: data.modeData, popupHeight: '200px', change: modeChange })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", null, "Enable / Disable item")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", { style: { maxWidth: '200px' } },
                                        React.createElement(ej2_react_dropdowns_2.MultiSelectComponent, { dataSource: data.headerData, popupHeight: '250px', width: '160px', mode: 'CheckBox', placeholder: 'Select item', showDropDownIcon: true, change: enabledisableChange },
                                            React.createElement(ej2_react_dropdowns_1.Inject, { services: [ej2_react_dropdowns_2.CheckBoxSelection] }))))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '15px' } },
                                    React.createElement("div", null, "Show Item on Click")),
                                React.createElement("td", { style: { width: '50%', paddingTop: '15px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: showOnClickChange })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the customization of ",
                React.createElement("code", null, "menu"),
                " component by using its properties from the property pane. Select any combination of properties from the property pane to customize ",
                React.createElement("code", null, "menu"),
                " component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demo, default menu is rendered with minimal configuration."),
            React.createElement("p", null,
                "This sample can be customized further with the combination of ",
                React.createElement("code", null, "menu"),
                " properties from the property pane. For example,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "You can switch to ",
                    React.createElement("b", null, "Vertical"),
                    " and ",
                    React.createElement("b", null, "Horizontal"),
                    " modes by clicking and selecting the",
                    React.createElement("code", null, "orientation"),
                    " mode from ",
                    React.createElement("i", null, "Orientation"),
                    " dropdownlist."),
                React.createElement("li", null,
                    "You can enable or disable menu items by clicking and selecting the item from ",
                    React.createElement("i", null, "Enable item"),
                    " or ",
                    React.createElement("i", null, "Disable item"),
                    " dropdownlists."),
                React.createElement("li", null,
                    "You can also enable the show menu item on mouse click ",
                    React.createElement("code", null, "showItemOnClick"),
                    " property by checking the",
                    React.createElement("i", null, "Show item on Click"),
                    " checkbox.")),
            React.createElement("p", null,
                "More information about menu can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/menu" }, "documentation"),
                " section."))));
};
exports.default = Api;
