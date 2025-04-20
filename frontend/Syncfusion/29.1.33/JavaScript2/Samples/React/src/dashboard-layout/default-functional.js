"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./default.component.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dashboardObj = (0, react_1.useRef)(null);
    var cellSpacing = [5, 5];
    var count = 8;
    var onCloseIconHandler = function (event) {
        var panel = event.target;
        if (panel.offsetParent) {
            dashboardObj.current.removePanel(panel.offsetParent.id);
        }
    };
    var btnClick = function () {
        var panel = [{
                'id': count.toString() + '_layout', 'sizeX': 1, 'sizeY': 1, 'row': 0, 'col': 0,
                content: '<span id="close" class="e-close-icon e-clear-icon"></span><div class="text-align">' + count.toString() + '</div>'
            }];
        dashboardObj.current.addPanel(panel[0]);
        var closeIcon = document.getElementById(count.toString() + '_layout').querySelector('.e-clear-icon');
        closeIcon.addEventListener('click', onCloseIconHandler.bind(_this));
        count = count + 1;
    };
    return (React.createElement("div", null,
        React.createElement("div", { id: "default_target", className: "control-section" },
            React.createElement("div", { className: "addContainer" },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "add", cssClass: "e-info", onClick: btnClick.bind(_this) }, "Add Panel")),
            React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { id: "default_dashboard", columns: 5, ref: dashboardObj, cellSpacing: cellSpacing, allowResizing: true },
                React.createElement("div", { id: "one", className: "e-panel", "data-row": "0", "data-col": "0", "data-sizeX": "1", "data-sizeY": "1" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "0"))),
                React.createElement("div", { id: "two", className: "e-panel", "data-row": "1", "data-col": "0", "data-sizeX": "1", "data-sizeY": "2" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "1"))),
                React.createElement("div", { id: "three", className: "e-panel", "data-row": "0", "data-col": "1", "data-sizeX": "2", "data-sizeY": "2" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "2"))),
                React.createElement("div", { id: "four", className: "e-panel", "data-row": "2", "data-col": "1", "data-sizeX": "1", "data-sizeY": "1" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "3"))),
                React.createElement("div", { id: "five", className: "e-panel", "data-row": "2", "data-col": "2", "data-sizeX": "2", "data-sizeY": "1" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "4"))),
                React.createElement("div", { id: "six", className: "e-panel", "data-row": "0", "data-col": "3", "data-sizeX": "1", "data-sizeY": "1" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "5"))),
                React.createElement("div", { id: "seven", className: "e-panel", "data-row": "1", "data-col": "3", "data-sizeX": "1", "data-sizeY": "1" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "6"))),
                React.createElement("div", { id: "eight", className: "e-panel", "data-row": "0", "data-col": "4", "data-sizeX": "1", "data-sizeY": "3" },
                    React.createElement("span", { id: "close", className: "e-close-icon e-clear-icon", onClick: onCloseIconHandler.bind(_this) }),
                    React.createElement("div", { className: "e-panel-container" },
                        React.createElement("div", { className: "text-align" }, "7"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-dashboard-layout" }, "React Dashboard Layout"),
                " example demonstrates the default functionalities of the DashboardLayout component. Click the Add Panel button to add panels dynamically to the dashboard layout.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The DashboardLayout component provides the capability to arrange, ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing", target: "_blank" }, "resize"),
                " and reorder the panels within the dashboard layout."))));
};
exports.default = Default;
