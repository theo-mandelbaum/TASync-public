"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var panel_data_1 = require("./panel-data");
require("./predefined-layouts.component.css");
var PredefinedLayouts = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var panels = panel_data_1.panelData;
    var dashboardObj = (0, react_1.useRef)(null);
    var cellSpacing = [5, 5];
    var reset = function () {
        var selectedElement = document.getElementsByClassName('e-selected-style');
        dashboardObj.current.removeAll();
        initializeTemplate(selectedElement[0], dashboardObj.current);
    };
    var initializeTemplate = function (element, dashboardObj) {
        var updatePanels = [];
        var index = parseInt(element.getAttribute('data-id'), 10) - 1;
        var panel = Object.keys(panels[index]).map(function (panelIndex) {
            return panels[index][panelIndex];
        });
        for (var i = 0; i < panel.length; i++) {
            var panelModelValue = {
                id: i.toString(),
                row: panel[i].row,
                col: panel[i].col,
                sizeX: panel[i].sizeX,
                sizeY: panel[i].sizeY,
                header: '<div class="e-header-text">Header Area</div><div class="header-border"></div>',
                content: '<div class="panel-content">Content Area</div>'
            };
            updatePanels.push(panelModelValue);
        }
        dashboardObj.panels = updatePanels;
    };
    var rendereComplete = function () {
        document.getElementById('templateContainer').onclick = function (args) {
            var target = args.target;
            var selectedElement = document.getElementsByClassName('e-selected-style');
            if (selectedElement.length) {
                selectedElement[0].classList.remove('e-selected-style');
            }
            if (target.className === 'image-pattern-style') {
                dashboardObj.current.removeAll();
                initializeTemplate(args.target, dashboardObj.current);
            }
            target.classList.add('e-selected-style');
        };
    };
    var onCreate = function () {
        if (document.querySelector('.container-fluid.custom')) {
            document.querySelector('.container-fluid').classList.remove('custom');
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "col-lg-8 control-section", id: "predefine_control" },
            React.createElement("div", { className: "content-wrapper", style: { "maxWidth": "100%" } },
                React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { created: onCreate.bind(_this), columns: 6, ref: dashboardObj, id: "predefine_dashboard", cellSpacing: cellSpacing },
                    React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                        React.createElement(ej2_react_layouts_1.PanelDirective, { row: 0, col: 0, sizeX: 4, sizeY: 3, content: "<div class='panel-content'>Content Area</div>", header: "<div class='e-header-text'>Header Area</div><div class='header-border'></div>" }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { row: 0, col: 4, sizeX: 2, sizeY: 3, content: "<div class='panel-content'>Content Area</div>", header: "<div class='e-header-text'>Header Area</div><div class='header-border'></div>" }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { row: 3, col: 0, sizeX: 6, sizeY: 3, content: "<div class='panel-content'>Content Area</div>", header: "<div class='e-header-text'>Header Area</div><div class='header-border'></div>" }))))),
        React.createElement("div", { className: "col-lg-4 property-section dashboard", id: "dash_property" },
            React.createElement("div", { className: "property-panel-header" }, "Properties"),
            React.createElement("div", { className: "row property-panel-content" },
                React.createElement("div", { className: "row row-header" }, "Choose dashboard layout"),
                React.createElement("div", { id: "templateContainer" },
                    React.createElement("div", { className: "row", style: { "paddingTop": "3px" } },
                        React.createElement("div", { className: "image-pattern-style e-selected-style", id: "template1", "data-id": "1" }),
                        React.createElement("div", { className: "image-pattern-style", id: "template2", "data-id": "2" }),
                        React.createElement("div", { className: "image-pattern-style", id: "template3", "data-id": "3" })),
                    React.createElement("div", { className: "row", style: { "paddingTop": "3px" } },
                        React.createElement("div", { className: "image-pattern-style", id: "template4", "data-id": "4" }),
                        React.createElement("div", { className: "image-pattern-style", id: "template5", "data-id": "5" }),
                        React.createElement("div", { className: "image-pattern-style", id: "template6", "data-id": "6" })))),
            React.createElement("div", { className: "col-sm-12 col-xs-12 col-lg-12 col-md-12 reset", style: { "padding": "10px" } },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "reset", onClick: reset.bind(_this) }, "Reset"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates, the functionality of dynamically updating the panels inside the DashboardLayout by selecting it from the pre-defined values in the properties panel. Go to the properties panel section and select any of the pre-defined layout, based on selection the panles are updated in the dashboard layout dynamically inside the DashboardLayout. Click the ",
                React.createElement("code", null, "reset"),
                " button to reset the panels settings of the layout.")),
        React.createElement("div", { id: "description" }, "This sample demonstrates how to update the panels dynamically in the dashboard layout component.")));
};
exports.default = PredefinedLayouts;
