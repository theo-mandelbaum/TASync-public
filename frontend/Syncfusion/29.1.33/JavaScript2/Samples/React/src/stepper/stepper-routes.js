"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepperCategory = exports.stepperRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var orientation_functional_1 = require("./orientation-functional");
var validation_functional_1 = require("./validation-functional");
var linear_functional_1 = require("./linear-functional");
exports.stepperRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stepper/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stepper/orientation', Component: orientation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stepper/validation', Component: validation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/stepper/linear', Component: linear_functional_1.default })));
exports.stepperCategory = { "default": { "name": "Default Functionalities", "category": "Stepper" }, "orientation": { "name": "Orientation", "category": "Stepper" }, "validation": { "name": "Validation", "category": "Stepper" }, "linear": { "name": "Linear Flow", "category": "Stepper" }, "defaultSample": "stepper/default" };
