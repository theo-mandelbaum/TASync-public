"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inplaceeditorCategory = exports.inplaceeditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var dropdowns_functional_1 = require("./dropdowns-functional");
var pickers_functional_1 = require("./pickers-functional");
var edit_post_functional_1 = require("./edit-post-functional");
exports.inplaceeditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/dropdowns', Component: dropdowns_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/pickers', Component: pickers_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/inplace-editor/edit-post', Component: edit_post_functional_1.default })));
exports.inplaceeditorCategory = { "default": { "name": "Overview", "category": "In-place Editor" }, "dropdowns": { "name": "DropDown Components", "category": "In-place Editor" }, "pickers": { "name": "Date Components", "category": "In-place Editor" }, "edit-post": { "name": "Edit Post", "category": "Use Case" }, "defaultSample": "inplace-editor/default" };
