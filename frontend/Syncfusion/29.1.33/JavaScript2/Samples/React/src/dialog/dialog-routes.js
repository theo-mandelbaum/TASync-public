"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dialogCategory = exports.dialogRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var modal_dialog_functional_1 = require("./modal-dialog-functional");
var template_functional_1 = require("./template-functional");
var dialog_contents_via_ajax_functional_1 = require("./dialog-contents-via-ajax-functional");
var draggable_functional_1 = require("./draggable-functional");
var resizable_functional_1 = require("./resizable-functional");
var position_functional_1 = require("./position-functional");
var animation_functional_1 = require("./animation-functional");
var multiple_dialogs_functional_1 = require("./multiple-dialogs-functional");
var components_dialog_functional_1 = require("./components-dialog-functional");
exports.dialogRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/modal-dialog', Component: modal_dialog_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/dialog-contents-via-ajax', Component: dialog_contents_via_ajax_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/draggable', Component: draggable_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/resizable', Component: resizable_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/position', Component: position_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/animation', Component: animation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/multiple-dialogs', Component: multiple_dialogs_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dialog/components-dialog', Component: components_dialog_functional_1.default })));
exports.dialogCategory = { "default": { "name": "Default Functionalities", "category": "Dialog" }, "modal-dialog": { "name": "Modal", "category": "Dialog" }, "template": { "name": "Template", "category": "Dialog" }, "dialog-contents-via-ajax": { "name": "Ajax Content", "category": "Dialog" }, "draggable": { "name": "Draggable", "category": "Dialog" }, "resizable": { "name": "Resizable", "category": "Dialog" }, "position": { "name": "Positioning", "category": "Dialog" }, "animation": { "name": "Animation", "category": "Dialog" }, "multiple-dialogs": { "name": "Multiple Dialogs", "category": "Dialog" }, "components-dialog": { "name": "Components inside Dialog", "category": "Dialog" }, "defaultSample": "dialog/default" };
