"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aidocumenteditorCategory = exports.aidocumenteditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var writing_assist_1 = require("./writing-assist");
var smart_editor_1 = require("./smart-editor");
exports.aidocumenteditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-document-editor/writing-assist', Component: writing_assist_1.WritingAssist }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-document-editor/smart-editor', Component: smart_editor_1.SmartEditor })));
exports.aidocumenteditorCategory = { "writing-assist": { "name": "Writing Assist", "category": "Document Editor" }, "smart-editor": { "name": "Smart Editor", "category": "Document Editor" }, "defaultSample": "ai-document-editor/writing-assist" };
