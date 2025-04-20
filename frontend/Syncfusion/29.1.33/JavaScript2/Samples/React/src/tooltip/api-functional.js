"use strict";
/**
 * Loading API sample
 */
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var ApiTooltip = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var tooltip = (0, react_1.useRef)(null);
    var data = ["Click", "Hover", "Auto"];
    var _a = (0, react_1.useState)("Tooltip content"), content = _a[0], setContent = _a[1];
    var _b = (0, react_1.useState)(45), height = _b[0], setHeight = _b[1];
    var _c = (0, react_1.useState)(100), width = _c[0], setWidth = _c[1];
    var _d = (0, react_1.useState)("Click"), mode = _d[0], setMode = _d[1];
    var _e = (0, react_1.useState)(false), isSticky = _e[0], setIsSticky = _e[1];
    var onClick = function (args) {
        if (tooltip.current != null) {
            if (!args.target.classList.contains("e-control") && !args.target.classList.contains("e-btn")) {
                if (!tooltip.current.isSticky && document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                    tooltip.current.close();
                }
            }
        }
    };
    var onScroll = function () {
        if (tooltip.current != null) {
            if (document.getElementsByClassName("e-tooltip-wrap").length > 0) {
                tooltip.current.close();
            }
        }
    };
    var created = function () {
        if (document.getElementById("right-pane")) {
            document.getElementById("right-pane").addEventListener("click", onClick.bind(_this));
            document.getElementById("right-pane").addEventListener("scroll", onScroll.bind(_this));
        }
    };
    var onModeChange = function (args) {
        tooltip.current.close();
        setMode(args.value);
    };
    var onHeightChange = function (args) {
        tooltip.current.close();
        setHeight(args.value);
        tooltip.current.refresh(tooltip.current.element);
    };
    var onWidthChange = function (args) {
        tooltip.current.close();
        setWidth(args.value);
        tooltip.current.refresh(tooltip.current.element);
    };
    var handleKeyPress = function (args) {
        tooltip.current.close();
        setContent(args.currentTarget.value);
    };
    var checkboxChange = function (args) {
        if (tooltip.current != null) {
            tooltip.current.close();
            setIsSticky(args.checked);
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "col-lg-8 control-section" },
                React.createElement(ej2_react_popups_1.TooltipComponent, { created: created.bind(_this), id: "defaultTooltip", ref: tooltip, content: content, height: height, width: width, opensOn: mode, isSticky: isSticky },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, null, "Show Tooltip"))),
            React.createElement("div", { className: "col-lg-4 property-section tooltip-api" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Content")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement("input", { id: "tooltipContentValue", onKeyUp: handleKeyPress.bind(_this), type: "text", className: "e-input", placeholder: "Tooltip content" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Height")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "height", value: height, change: onHeightChange.bind(_this), "aria-label": "height value" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Width")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { id: "width", className: "e-input", value: width, change: onWidthChange.bind(_this), "aria-label": "width value" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Open Mode")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: data, value: mode, placeholder: "Select mode", change: onModeChange.bind(_this), id: "ddlelement" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect" }, "Sticky Mode")),
                                React.createElement("td", { style: { width: "50%", paddingRight: "10px" } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "sticky", checked: isSticky, change: checkboxChange.bind(_this), "aria-label": "sticky" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to customize the tooltip component by using its properties from the property pane. Select any combination of properties from the property pane to customize tooltips.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demo, the default tooltip is rendered with minimal configuration. This sample can be customized further with the combination of tooltip properties from the property pane. For example,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Any change made to a textbox in the property pane will be reflected in the tooltip ",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#content" }, "content")),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#issticky" }, "StickyMode"),
                    " can be enabled by checking the sticky mode option in the property pane."),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#height" }, "Height"),
                    " and",
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#width" }, "width"),
                    " can be changed from the property pane."),
                React.createElement("li", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/tooltip/#openson" }, "OpenMode"),
                    " can be changed from the property pane.")))));
};
exports.default = ApiTooltip;
