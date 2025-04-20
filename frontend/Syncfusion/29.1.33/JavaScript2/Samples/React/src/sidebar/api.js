"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
var React = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./api.css");
var API = /** @class */ (function (_super) {
    __extends(API, _super);
    function API() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dataTypes = [
            { Type: 'Over', value: 'Over' },
            { Type: 'Push', value: 'Push' },
            { Type: 'Slide', value: 'Slide' },
            { Type: 'Auto', value: 'Auto' }
        ];
        _this.fields = { text: 'Type', value: 'value' };
        _this.showBackdrop = false;
        _this.closeOnDocumentClick = false;
        _this.height = '220px';
        _this.index = 3;
        return _this;
    }
    API.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "sidebar-api wrapper-container" },
            React.createElement("div", { id: "api-wrapper", className: "control-section apimaincontent" },
                React.createElement("div", null,
                    React.createElement("div", { className: "list-group" },
                        React.createElement("div", { className: "list-group-item" },
                            React.createElement("span", { id: "apihamburger", className: "e-icons menu", onClick: this.toggleBtnClick.bind(this) }),
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
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "apitogglesidebar", cssClass: "e-primary inline-element right", isToggle: true, onClick: this.toggleBtnClick.bind(this) }, "Toggle"),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: " inline-element", style: { width: "70%" } },
                                    React.createElement("b", null, "Position"),
                                    " - Allows to place the sidebar in right or left side of the page."),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (Button) { return _this.positionBtn = Button; }, id: "positionBtn", cssClass: "e-primary inline-element right", isToggle: true, content: "Left", onClick: this.positionBtnClick.bind(this) }),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: "inline-element", style: { width: "70%" } },
                                    React.createElement("b", null, "Types "),
                                    " - Specifies the act of expanding or collapsing the sidebar with main content."),
                                React.createElement("div", { className: "inline-element right", style: { width: "80px" } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (DropDownList) { return _this.dropDownObj = DropDownList; }, popupHeight: this.height, cssClass: "e-textbox right", index: this.index, dataSource: this.dataTypes, fields: this.fields, change: this.onChange.bind(this) })),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: " inline-element", style: { width: "70%" } },
                                    React.createElement("b", null, "Closing on document click"),
                                    " - Allows to collapse / close the sidebar on document click."),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (Button) { return _this.documentBtn = Button; }, id: "documentElement", cssClass: "e-primary inline-element right", content: "False", isToggle: true, onClick: this.docBtnClick.bind(this) }),
                                React.createElement("br", null),
                                React.createElement("br", null),
                                React.createElement("p", { className: " inline-element", style: { width: "70%" } },
                                    React.createElement("b", null, "Backdrop"),
                                    " - Sets the backdrop over the main content area on open / expanded state. "),
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (Button) { return _this.backdropBtn = Button; }, id: "backDropElement", cssClass: "e-primary inline-element right", isToggle: true, content: "False", onClick: this.backBtnClick.bind(this) }),
                                React.createElement("br", null),
                                React.createElement("br", null))))),
                React.createElement(ej2_react_navigations_1.SidebarComponent, { ref: function (Sidebar) { return _this.sidebarInstance = Sidebar; }, closeOnDocumentClick: this.closeOnDocumentClick, showBackdrop: this.showBackdrop, width: "220px", target: ".apimaincontent", id: "apiSidebar", className: "default-sidebar" },
                    React.createElement("div", { className: "title-header" },
                        React.createElement("div", { style: { display: "inline-block" } }, " Sidebar "),
                        React.createElement("span", { id: "apiclose", className: "e-icons", onClick: this.sidebarClose.bind(this) })),
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
    API.prototype.onChange = function () {
        var types = this.dropDownObj.value;
        this.sidebarInstance.type = types;
        this.sidebarInstance.dataBind();
    };
    API.prototype.toggleBtnClick = function () {
        this.sidebarInstance.toggle();
        if (this.positionBtn.content == "True") {
            this.sidebarInstance.showBackdrop = true;
        }
    };
    API.prototype.positionBtnClick = function () {
        if (this.positionBtn.content == "Right") {
            this.positionBtn.content = "Left";
            this.sidebarInstance.position = "Left";
        }
        else {
            this.positionBtn.content = "Right";
            this.sidebarInstance.position = "Right";
        }
        this.positionBtn.dataBind();
        this.sidebarInstance.dataBind();
    };
    API.prototype.docBtnClick = function () {
        if (this.documentBtn.content == "False") {
            this.documentBtn.content = "True";
            this.sidebarInstance.closeOnDocumentClick = true;
        }
        else {
            this.documentBtn.content = "False";
            this.sidebarInstance.closeOnDocumentClick = false;
        }
        this.sidebarInstance.dataBind();
        this.documentBtn.dataBind();
    };
    API.prototype.backBtnClick = function () {
        if (this.backdropBtn.content == "True") {
            this.backdropBtn.content = "False";
            this.sidebarInstance.showBackdrop = false;
        }
        else {
            this.backdropBtn.content = "True";
            this.sidebarInstance.showBackdrop = true;
        }
    };
    API.prototype.sidebarClose = function () {
        this.sidebarInstance.hide();
        if (this.sidebarInstance.showBackdrop == true) {
            this.sidebarInstance.showBackdrop = false;
        }
    };
    return API;
}(sample_base_1.SampleBase));
exports.API = API;
