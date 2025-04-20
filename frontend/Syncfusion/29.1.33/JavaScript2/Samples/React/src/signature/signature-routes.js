"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signatureCategory = exports.signatureRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var toolbar_functional_1 = require("./toolbar-functional");
exports.signatureRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/signature/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/signature/toolbar', Component: toolbar_functional_1.default })));
exports.signatureCategory = { "default": { "name": "Default Functionalities", "category": "Signature" }, "toolbar": { "name": "Toolbar", "category": "Signature" }, "defaultSample": "signature/default" };
