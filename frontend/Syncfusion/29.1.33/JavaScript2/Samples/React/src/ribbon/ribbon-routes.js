"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ribbonCategory = exports.ribbonRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var simplified_functional_1 = require("./simplified-functional");
var backstage_functional_1 = require("./backstage-functional");
var contextual_functional_1 = require("./contextual-functional");
var resize_functional_1 = require("./resize-functional");
var keytip_functional_1 = require("./keytip-functional");
var gallery_functional_1 = require("./gallery-functional");
exports.ribbonRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ribbon/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ribbon/simplified', Component: simplified_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ribbon/backstage', Component: backstage_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ribbon/contextual', Component: contextual_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ribbon/resize', Component: resize_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ribbon/keytip', Component: keytip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ribbon/gallery', Component: gallery_functional_1.default })));
exports.ribbonCategory = { "default": { "name": "Default Functionalities", "category": "Ribbon" }, "simplified": { "name": "Simplified Mode", "category": "Ribbon" }, "backstage": { "name": "Backstage", "category": "Ribbon" }, "contextual": { "name": "Contextual Tabs", "category": "Ribbon" }, "resize": { "name": "Ribbon Resizing", "category": "Ribbon" }, "keytip": { "name": "Ribbon KeyTips", "category": "Ribbon" }, "gallery": { "name": "Ribbon Gallery", "category": "Ribbon" }, "defaultSample": "ribbon/default" };
