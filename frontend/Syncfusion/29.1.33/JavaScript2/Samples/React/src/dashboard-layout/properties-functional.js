"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_layouts_1 = require("@syncfusion/ej2-react-layouts");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./properties.component.css");
var Properties = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isResize = _a[0], setIsResize = _a[1];
    var _b = (0, react_1.useState)(true), isFloat = _b[0], setIsFloat = _b[1];
    var _c = (0, react_1.useState)([5, 5]), cellSpace = _c[0], setCellSpace = _c[1];
    var count = 5;
    var dashboardObj = (0, react_1.useRef)(null);
    var onAdd = function () {
        count = count + 1;
        var panel = [{
                'id': count.toString() + '_layout', 'sizeX': 2, 'sizeY': 2, 'row': 0, 'col': 0,
                header: '<div>Panel ' + count.toString() + '</div>', content: '<div></div>'
            }];
        dashboardObj.current.addPanel(panel[0]);
    };
    var remove = function () {
        if (dashboardObj.current.panels.length > 0) {
            for (var i = dashboardObj.current.panels.length - 1; i < dashboardObj.current.panels.length; i++) {
                dashboardObj.current.removePanel(dashboardObj.current.panels[dashboardObj.current.panels.length - 1 - i].id);
            }
        }
    };
    var onCellChange = function (args) {
        setCellSpace([parseInt(args.value, 10), parseInt(args.value, 10)]);
    };
    var onChange = function (args) {
        if (args.event.currentTarget.firstChild.childNodes[0].id === 'floating') {
            setIsFloat(args.checked);
        }
        if (args.event.currentTarget.firstChild.childNodes[0].id === 'resizing') {
            setIsResize(args.checked);
        }
    };
    var onCreate = function () {
        if (document.querySelector('.container-fluid.custom')) {
            document.querySelector('.container-fluid').classList.remove('custom');
        }
    };
    return (React.createElement("div", null,
        React.createElement("div", { className: "col-lg-8 control-section", id: "control_dash" },
            React.createElement("div", { className: "content-wrapper", style: { "maxWidth": "100%" } },
                React.createElement(ej2_react_layouts_1.DashboardLayoutComponent, { created: onCreate.bind(_this), id: "api_dashboard", columns: 6, cellSpacing: cellSpace, ref: dashboardObj, allowResizing: isResize, allowFloating: isFloat },
                    React.createElement(ej2_react_layouts_1.PanelsDirective, null,
                        React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 1</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 0, col: 0 }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 2</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 0, col: 2 }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 3</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 0, col: 4 }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 4</div>", content: "<div></div>", sizeX: 4, sizeY: 2, row: 2, col: 0 }),
                        React.createElement(ej2_react_layouts_1.PanelDirective, { header: "<div>Panel 5</div>", content: "<div></div>", sizeX: 2, sizeY: 2, row: 2, col: 4 }))))),
        React.createElement("div", { className: "col-lg-4 property-section dashboard", id: "api_property" },
            React.createElement("div", { className: "property-panel-header" }, " Properties "),
            React.createElement("div", { className: "row property-panel-content" },
                React.createElement("div", { className: "card-body" },
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("label", { className: "col-sm-4 col-form-label form-label" }, "CellSpacing"),
                        React.createElement("span", { className: "col-sm-8" },
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { className: "col-sm-4", type: "text", placeholder: "Ex: 10", value: 10, min: 1, max: 20, floatLabelType: "Never", id: "cellSpacing", change: onCellChange.bind(_this) }))),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("label", { className: "col-sm-4 col-form-label form-label" }, "AllowFloating"),
                        React.createElement("span", { className: "col-sm-8" },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { className: "col-sm-8", name: "floating", id: "floating", checked: true, change: onChange.bind(_this) }))),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("label", { className: "col-sm-4 col-form-label form-label" }, "AllowResizing"),
                        React.createElement("span", { className: "col-sm-8" },
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { name: "resizing", id: "resizing", checked: true, change: onChange.bind(_this) }))),
                    React.createElement("div", { className: "form-group row" },
                        React.createElement("div", { className: "col-sm-12" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: onAdd.bind(_this), cssClass: "e-primary" }, "Add Panel"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { onClick: remove.bind(_this), cssClass: "e-danger", style: { "marginLeft": "3px" } }, "Remove Panel")))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the properties of DashboardLayout component from the property pane. Select any combination of properties from the property pane to customize the DashboardLayout.")),
        React.createElement("div", { id: "description" },
            "This sample allows to configure the ",
            React.createElement("code", null,
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#cellspacing", target: "_blank" }, "cellSpacing")),
            ",",
            React.createElement("code", null,
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowfloating", target: "_blank" }, "allowFloating")),
            " and",
            React.createElement("code", null,
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/dashboard-layout#allowresizing", target: "_blank" }, "allowResizing")),
            " properties of the dashboard layout component.")));
};
exports.default = Properties;
