"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiimageeditorCategory = exports.aiimageeditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var smart_image_editor_1 = require("./smart-image-editor");
exports.aiimageeditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-image-editor/smart-image-editor', Component: smart_image_editor_1.SmartImageEditor })));
exports.aiimageeditorCategory = { "smart-image-editor": { "name": "Smart Image Editor", "category": "Image Editor" }, "defaultSample": "ai-image-editor/smart-image-editor" };
