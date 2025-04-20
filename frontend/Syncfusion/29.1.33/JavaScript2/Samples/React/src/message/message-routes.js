"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageCategory = exports.messageRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var variants_functional_1 = require("./variants-functional");
var icons_functional_1 = require("./icons-functional");
var customization_functional_1 = require("./customization-functional");
var template_functional_1 = require("./template-functional");
exports.messageRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/message/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/message/variants', Component: variants_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/message/icons', Component: icons_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/message/customization', Component: customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/message/template', Component: template_functional_1.default })));
exports.messageCategory = { "default": { "name": "Default Functionalities", "category": "Message" }, "variants": { "name": "Variants", "category": "Message" }, "icons": { "name": "Icons", "category": "Message" }, "customization": { "name": "Customization", "category": "Message" }, "template": { "name": "Template", "category": "Message" }, "defaultSample": "message/default" };
