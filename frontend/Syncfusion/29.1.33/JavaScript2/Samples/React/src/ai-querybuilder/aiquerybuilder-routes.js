"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiquerybuilderCategory = exports.aiquerybuilderRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var natural_language_query_1 = require("./natural-language-query");
exports.aiquerybuilderRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-querybuilder/natural-language-query', Component: natural_language_query_1.NaturalLanguageQuery })));
exports.aiquerybuilderCategory = { "natural-language-query": { "name": "Natural Language Query", "category": "Query Builder" }, "defaultSample": "ai-querybuilder/natural-language-query" };
