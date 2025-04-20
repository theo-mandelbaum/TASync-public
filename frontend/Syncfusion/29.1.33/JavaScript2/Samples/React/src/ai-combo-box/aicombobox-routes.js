"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aicomboboxCategory = exports.aicomboboxRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var semantic_searching_1 = require("./semantic-searching");
exports.aicomboboxRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-combo-box/semantic-searching', Component: semantic_searching_1.ComboBoxSemanticSearch })));
exports.aicomboboxCategory = { "semantic-searching": { "name": "Semantic Searching (Embedding)", "category": "ComboBox" }, "defaultSample": "ai-combo-box/semantic-searching" };
