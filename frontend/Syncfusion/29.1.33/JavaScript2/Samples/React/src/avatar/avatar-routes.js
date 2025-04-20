"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.avatarCategory = exports.avatarRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var types_functional_1 = require("./types-functional");
var badge_functional_1 = require("./badge-functional");
var listview_functional_1 = require("./listview-functional");
var card_functional_1 = require("./card-functional");
exports.avatarRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/types', Component: types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/badge', Component: badge_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/listview', Component: listview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/avatar/card', Component: card_functional_1.default })));
exports.avatarCategory = { "default": { "name": "Default", "category": "Avatar" }, "types": { "name": "Types", "category": "Avatar" }, "badge": { "name": "Badge", "category": "Integration" }, "listview": { "name": "ListView", "category": "Integration" }, "card": { "name": "Card", "category": "Integration" }, "defaultSample": "avatar/default" };
