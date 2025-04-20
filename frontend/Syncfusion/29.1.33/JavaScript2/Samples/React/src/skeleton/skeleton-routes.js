"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.skeletonCategory = exports.skeletonRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var animation_functional_1 = require("./animation-functional");
exports.skeletonRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/skeleton/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/skeleton/animation', Component: animation_functional_1.default })));
exports.skeletonCategory = { "default": { "name": "Default Functionalities", "category": "Skeleton" }, "animation": { "name": "Animation", "category": "Skeleton" }, "defaultSample": "skeleton/default" };
