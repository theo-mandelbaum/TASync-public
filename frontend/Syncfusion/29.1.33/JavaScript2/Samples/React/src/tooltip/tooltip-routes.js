"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tooltipCategory = exports.tooltipRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var template_functional_1 = require("./template-functional");
var ajaxcontent_1 = require("./ajaxcontent");
var smartposition_functional_1 = require("./smartposition-functional");
var tooltip_menu_functional_1 = require("./tooltip-menu-functional");
var html_content_functional_1 = require("./html-content-functional");
var api_functional_1 = require("./api-functional");
exports.tooltipRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/ajaxcontent', Component: ajaxcontent_1.AjaxContentTooltip }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/smartposition', Component: smartposition_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/tooltip-menu', Component: tooltip_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/html-content', Component: html_content_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tooltip/api', Component: api_functional_1.default })));
exports.tooltipCategory = { "default": { "name": "Default Functionalities", "category": "Tooltip" }, "template": { "name": "Template", "category": "Tooltip" }, "ajaxcontent": { "name": "Ajax Content", "category": "Tooltip" }, "smartposition": { "name": "Smart Positioning", "category": "Tooltip" }, "tooltip-menu": { "name": "Tooltip Menu", "category": "Tooltip" }, "html-content": { "name": "HTML Content", "category": "Tooltip" }, "api": { "name": "API", "category": "Tooltip" }, "defaultSample": "tooltip/default" };
