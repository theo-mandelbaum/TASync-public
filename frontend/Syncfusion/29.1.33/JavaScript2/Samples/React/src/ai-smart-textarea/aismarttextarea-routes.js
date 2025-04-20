"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aismarttextareaCategory = exports.aismarttextareaRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
exports.aismarttextareaRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-smart-textarea/default', Component: default_1.Default })));
exports.aismarttextareaCategory = { "default": { "name": "Smart TextArea", "category": "Smart TextArea" }, "defaultSample": "ai-smart-textarea/default" };
