"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var data = require("./data.json");
var property_pane_1 = require("../common/property-pane");
var Api = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var datas = data;
    var colorCss = '';
    var outlineCss = '';
    var _a = (0, react_1.useState)(''), cssClass = _a[0], SetCssClass = _a[1];
    var _b = (0, react_1.useState)(''), avatarIconCss = _b[0], SetAvatarIconCss = _b[1];
    var _c = (0, react_1.useState)(''), avatarText = _c[0], SetAvatarText = _c[1];
    var _d = (0, react_1.useState)(''), trailingIconCss = _d[0], SetTrailingIconCss = _d[1];
    var _e = (0, react_1.useState)(''), leadingIconCss = _e[0], SetLeadingIconCss = _e[1];
    // checkbox change handler for chip leading icon
    var iconHandler = function (e) {
        SetLeadingIconCss(e.checked ? 'janet' : '');
    };
    // drop-down list change handler for chip color
    var colorChange = function (e) {
        SetCssClass("e-".concat(e.value.toLowerCase(), " ").concat(outlineCss.trim()));
        colorCss = "e-".concat(e.value.toLowerCase());
    };
    // checkbox change handler for chip outline
    var variantHandler = function (e) {
        outlineCss = e.checked ? 'e-outline' : '';
        SetCssClass("".concat(colorCss, " ").concat(outlineCss).trim());
    };
    // drop-down list change handler for chip avatar
    var avatarHandler = function (e) {
        SetAvatarIconCss((e.value.toLowerCase() === 'icon') ? 'e-icon' : (e.value.toLowerCase() === 'image') ? 'janet' : ''), SetAvatarText(e.value.toLowerCase() === 'letter' ? 'JL' : '');
    };
    // checkbox change handler for chip trailing icon
    var deleteIconHandler = function (e) {
        SetTrailingIconCss(e.checked ? 'e-dlt-btn' : '');
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "col-lg-8 control-section" },
            React.createElement("div", { id: "chip-api-wrapper" },
                React.createElement(ej2_react_buttons_1.ChipListComponent, { id: "chip", text: "Janet Leverling", cssClass: cssClass, avatarIconCss: avatarIconCss, trailingIconCss: trailingIconCss, avatarText: avatarText, leadingIconCss: leadingIconCss }))),
        React.createElement("div", { className: "col-lg-4 property-section", id: "chips-api-property" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "50%" } },
                                React.createElement("div", { className: "userselect" }, "Color")),
                            React.createElement("td", { style: { width: "50%", "paddingRight": "10px" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "chip-color", dataSource: datas.ddlData, placeholder: "Select a color", change: colorChange.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "50%" } },
                                React.createElement("div", { className: "userselect" }, "Leading icon")),
                            React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "chip-leadingicon", change: iconHandler.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "50%" } },
                                React.createElement("div", { className: "userselect" }, "Avatar")),
                            React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                React.createElement("div", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "chip-avatar", dataSource: datas.avatarData, placeholder: "Select an avatar", change: avatarHandler.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "50%" } },
                                React.createElement("div", { className: "userselect" }, "Trailing icon")),
                            React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "chip-trailingicon", change: deleteIconHandler.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: "50%" } },
                                React.createElement("div", { className: "userselect" }, "Outline")),
                            React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "chip-outline", change: variantHandler.bind(_this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates most commonly used API functionalities of chip control from the property pane. Select any combination of properties from the property pane to customize the appearance of chip.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this sample, default chip is rendered with minimal configuration."),
            React.createElement("p", null, "This sample can be customized further with the combination of Chip properties from the property pane. For example,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Color variant can be changed by selecting the color dropdownlist from property pane. This can be achieved by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chips/#cssclass" }, "CssClass"),
                    " property."),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chips/#leadingiconcss" }, "Leading"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chips/#trailingiconcss" }, "Trailing"),
                    " icons can be enabled by selecting Leading or Trailing Icon checkbox from property pane."),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chips/#leadingiconcss" }, "Leading"),
                    " icon can be customized with avatar initials, icons and images from property pane"),
                React.createElement("li", null,
                    "Outline chip type can be enabled by checking outline checkbox from property pane. This can be achieved by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chips/#cssclass" }, "CssClass"),
                    " property.")))));
};
exports.default = Api;
