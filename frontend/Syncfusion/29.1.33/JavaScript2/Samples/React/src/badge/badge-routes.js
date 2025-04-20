"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.badgeCategory = exports.badgeRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var types_functional_1 = require("./types-functional");
var notification_functional_1 = require("./notification-functional");
var listview_functional_1 = require("./listview-functional");
var accordion_functional_1 = require("./accordion-functional");
var toolbar_functional_1 = require("./toolbar-functional");
exports.badgeRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/types', Component: types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/notification', Component: notification_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/listview', Component: listview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/accordion', Component: accordion_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/badge/toolbar', Component: toolbar_functional_1.default })));
exports.badgeCategory = { "default": { "name": "Default", "category": "Badge" }, "types": { "name": "Types", "category": "Badge" }, "notification": { "name": "Notification", "category": "Badge" }, "listview": { "name": "ListView", "category": "Integration" }, "accordion": { "name": "Accordion", "category": "Integration" }, "toolbar": { "name": "Toolbar", "category": "Integration" }, "defaultSample": "badge/default" };
