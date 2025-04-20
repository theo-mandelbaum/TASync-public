"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var API = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("Auto"), type = _a[0], setType = _a[1];
    var _b = (0, react_1.useState)(false), isShowBackdrop = _b[0], setShowBackdrop = _b[1];
    var _c = (0, react_1.useState)("Left"), positionContent = _c[0], setPositionContent = _c[1];
    var _d = (0, react_1.useState)("Left"), position = _d[0], setPosition = _d[1];
    var _e = (0, react_1.useState)("False"), documentContent = _e[0], setDocumentContent = _e[1];
    var _f = (0, react_1.useState)(false), isCloseOnDocumentClick = _f[0], setCloseOnDocumentClick = _f[1];
    var _g = (0, react_1.useState)("False"), backDropContent = _g[0], setBackDropContent = _g[1];
    var sidebarInstance = (0, react_1.useRef)(null);
    var dataTypes = [
        { Type: 'Over', value: 'Over' },
        { Type: 'Push', value: 'Push' },
        { Type: 'Slide', value: 'Slide' },
        { Type: 'Auto', value: 'Auto' }
    ];
    var fields = { text: 'Type', value: 'value' };
    var height = '220px';
    var index = 3;
    var onChange = function (args) {
        setType(args.value);
    };
    var toggleBtnClick = function () {
        sidebarInstance.current.toggle();
        if (backDropContent == "True") {
            setShowBackdrop(true);
        }
    };
    var positionBtnClick = function () {
        if (positionContent == "Right") {
            setPositionContent("Left");
            setPosition("Left");
        }
        else {
            ;
            setPositionContent("Right");
            setPosition("Right");
        }
    };
    var docBtnClick = function () {
        if (documentContent == "False") {
            setDocumentContent("True");
            setCloseOnDocumentClick(true);
        }
        else {
            setDocumentContent("False");
            setCloseOnDocumentClick(false);
        }
    };
    var backBtnClick = function () {
        if (backDropContent == "True") {
            setBackDropContent("False");
            setShowBackdrop(false);
        }
        else {
            setBackDropContent("True");
            setShowBackdrop(true);
        }
    };
    var sidebarClose = function () {
        sidebarInstance.current.hide();
        if (isShowBackdrop == true) {
            setShowBackdrop(false);
        }
    };
    return (React.createElement("div", { className: "sidebar-api wrapper-container" },
        React.createElement("div", { id: "api-wrapper", className: "control-section apimaincontent" },
            React.createElement("div", null,
                React.createElement("div", { className: "list-group" },
                    React.createElement("div", { className: "list-group-item" },
                        React.createElement("span", { id: "apihamburger", className: "e-icons menu", onClick: toggleBtnClick.bind(_this) }),
                        React.createElement("div", { className: "title" }, "Overview"),
                        React.createElement("br", null),
                        React.createElement("p", null, " The Sidebar component is a collapsible side content placed along with the main content either in left or right side of the page. "),
                        React.createElement("p", null,
                            " ",
                            React.createElement("br", null),
                            " "),
                        React.createElement("div", { className: "title" }, "Options"),
                        React.createElement("br", null),
                        React.createElement("div", { className: "inline-element responsive" },
                            React.createElement("p", { className: " inline-element", style: { width: "70%" } },
                                React.createElement("b", null, "Toggle"),
                                " - Toggles the Sidebar to be open or closed state."),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "apitogglesidebar", cssClass: "e-primary inline-element right", isToggle: true, onClick: toggleBtnClick.bind(_this) }, "Toggle"),
                            React.createElement("br", null),
                            React.createElement("br", null),
                            React.createElement("p", { className: " inline-element", style: { width: "70%" } },
                                React.createElement("b", null, "Position"),
                                " - Allows to place the sidebar in right or left side of the page."),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "positionBtn", cssClass: "e-primary inline-element right", isToggle: true, content: positionContent, onClick: positionBtnClick.bind(_this) }),
                            React.createElement("br", null),
                            React.createElement("br", null),
                            React.createElement("p", { className: "inline-element", style: { width: "70%" } },
                                React.createElement("b", null, "Types "),
                                " - Specifies the act of expanding or collapsing the sidebar with main content."),
                            React.createElement("div", { className: "inline-element right", style: { width: "80px" } },
                                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { popupHeight: height, cssClass: "e-textbox right", index: index, dataSource: dataTypes, fields: fields, change: onChange.bind(_this) })),
                            React.createElement("br", null),
                            React.createElement("br", null),
                            React.createElement("p", { className: " inline-element", style: { width: "70%" } },
                                React.createElement("b", null, "Closing on document click"),
                                " - Allows to collapse / close the sidebar on document click."),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "documentElement", cssClass: "e-primary inline-element right", content: documentContent, isToggle: true, onClick: docBtnClick.bind(_this) }),
                            React.createElement("br", null),
                            React.createElement("br", null),
                            React.createElement("p", { className: " inline-element", style: { width: "70%" } },
                                React.createElement("b", null, "Backdrop"),
                                " - Sets the backdrop over the main content area on open / expanded state. "),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "backDropElement", cssClass: "e-primary inline-element right", isToggle: true, content: backDropContent, onClick: backBtnClick.bind(_this) }),
                            React.createElement("br", null),
                            React.createElement("br", null))))),
            React.createElement(ej2_react_navigations_1.SidebarComponent, { ref: sidebarInstance, closeOnDocumentClick: isCloseOnDocumentClick, showBackdrop: isShowBackdrop, width: "220px", target: ".apimaincontent", id: "apiSidebar", className: "default-sidebar", type: type, position: position },
                React.createElement("div", { className: "title-header" },
                    React.createElement("div", { style: { display: "inline-block" } }, " Sidebar "),
                    React.createElement("span", { id: "apiclose", className: "e-icons", onClick: sidebarClose.bind(_this) })),
                React.createElement("div", { className: "sub-title" }, "The React Sidebar is an expandable and collapsible component that typically acts as a side container to place primary or secondary content alongside the main content. It provides flexible options that can be shown and hidden based on user interactions.")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The Sidebar API sample demonstrates how to customize the Sidebar component by using its properties from the property pane. Select any combination of properties from the property pane to customize the Sidebar. Click on the hamburger menu icon to expand/collapse the sidebar.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo, the default Sidebar is rendered with minimal configuration. This sample can be customized further with the combination of Sidebar properties. For example,"),
                React.createElement("ul", null,
                    React.createElement("li", null, "The Sidebar can be opened or closed by clicking on the toggle button."),
                    React.createElement("li", null,
                        "The Sidebar ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/sidebar#position" }, "position"),
                        " can be changed by clicking on the position button."),
                    React.createElement("li", null,
                        "The Sidebar ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/sidebar#type" }, "types"),
                        " can be changed from the Dropdown List."),
                    React.createElement("li", null,
                        "The Sidebar can be collapsed or closed on ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/sidebar#closeondocumentclick" }, "document click"),
                        " from the provided options."),
                    React.createElement("li", null,
                        "The Sidebar overlay can be enabled or disabled by clicking on the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/sidebar#showbackdrop" }, "Backdrop button"),
                        "."))))));
};
exports.default = API;
