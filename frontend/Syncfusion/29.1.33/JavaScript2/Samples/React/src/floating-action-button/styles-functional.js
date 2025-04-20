"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./styles.css");
var Styles = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "fab-appearence-container" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("div", { id: "target1", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Primary")),
                        React.createElement("div", { id: "target2", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Secondary"))),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("div", { id: "target3", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Outline")),
                        React.createElement("div", { id: "target7", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Info")))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("div", { id: "target4", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Success")),
                        React.createElement("div", { id: "target5", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Warning"))),
                    React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                        React.createElement("div", { id: "target6", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Danger")),
                        React.createElement("div", { id: "target8", className: "col-xs-12 col-sm-12 col-lg-6 col-md-6 custom-index" },
                            React.createElement("label", { className: "fab-name" }, "Label shows on hover")))),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab1", iconCss: 'fab-icons fab-icon-shopping', position: 'BottomCenter', target: '#target1', title: "Primary" }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab2", iconCss: 'fab-icons fab-icon-shopping', isPrimary: false, position: 'BottomCenter', target: '#target2', title: "Secondary" }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab3", iconCss: 'fab-icons fab-icon-shopping', cssClass: 'e-outline', position: 'BottomCenter', target: '#target3', title: "Outline" }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab4", iconCss: 'fab-icons fab-icon-shopping', cssClass: 'e-success', position: 'BottomCenter', target: '#target4', title: "Success" }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab5", iconCss: 'fab-icons fab-icon-shopping', cssClass: 'e-warning', position: 'BottomCenter', target: '#target5', title: "Warning" }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab6", iconCss: 'fab-icons fab-icon-shopping', cssClass: 'e-danger', position: 'BottomCenter', target: '#target6', title: "Danger" }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab7", iconCss: 'fab-icons fab-icon-shopping', cssClass: 'e-info', position: 'BottomCenter', target: '#target7', title: "Info" }),
                React.createElement(ej2_react_buttons_1.FabComponent, { id: "fab8", iconCss: 'fab-icons fab-icon-shopping', position: 'BottomCenter', cssClass: 'fab-hover', content: '<span class="text-container"><span class="textEle">Shopping</span></span>', target: '#target8', title: "Shopping" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the changes that can be made to the appearance of the Floating Action Button using predefined styles.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The appearance of FAB can be customized using the ",
                React.createElement("code", null, "cssClass"),
                " and ",
                React.createElement("code", null, "isPrimary"),
                " properties. FAB provides predefined styles which can be set using the ",
                React.createElement("code", null, "cssClass"),
                " property."))));
};
exports.default = Styles;
