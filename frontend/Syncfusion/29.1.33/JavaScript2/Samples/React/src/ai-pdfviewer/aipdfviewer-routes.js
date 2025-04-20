"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aipdfviewerCategory = exports.aipdfviewerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var smartfill_1 = require("./smartfill");
var smartredact_1 = require("./smartredact");
var summarizer_1 = require("./summarizer");
exports.aipdfviewerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-pdfviewer/smartfill', Component: smartfill_1.SmartFill }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-pdfviewer/smartredact', Component: smartredact_1.SmartRedact }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-pdfviewer/summarizer', Component: summarizer_1.Summarizer })));
exports.aipdfviewerCategory = { "smartfill": { "name": "Smart Fill", "category": "PDF Viewer" }, "smartredact": { "name": "Smart Redact", "category": "PDF Viewer" }, "summarizer": { "name": "Summarizer", "category": "PDF Viewer" }, "defaultSample": "ai-pdfviewer/smartfill" };
