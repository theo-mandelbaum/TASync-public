"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speeddialCategory = exports.speeddialRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var linear_functional_1 = require("./linear-functional");
var radial_functional_1 = require("./radial-functional");
var styles_functional_1 = require("./styles-functional");
var template_functional_1 = require("./template-functional");
var modal_functional_1 = require("./modal-functional");
exports.speeddialRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speed-dial/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speed-dial/linear', Component: linear_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speed-dial/radial', Component: radial_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speed-dial/styles', Component: styles_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speed-dial/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speed-dial/modal', Component: modal_functional_1.default })));
exports.speeddialCategory = { "default": { "name": "Default Functionalities", "category": "SpeedDial" }, "linear": { "name": "Position (Linear)", "category": "SpeedDial" }, "radial": { "name": "Radial Menu", "category": "SpeedDial" }, "styles": { "name": "Styles", "category": "SpeedDial" }, "template": { "name": "Template", "category": "SpeedDial" }, "modal": { "name": "Modal", "category": "SpeedDial" }, "defaultSample": "speed-dial/default" };
