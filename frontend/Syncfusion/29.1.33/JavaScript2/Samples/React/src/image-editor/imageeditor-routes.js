"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageeditorCategory = exports.imageeditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var profile_picture_functional_1 = require("./profile-picture-functional");
var custom_toolbar_functional_1 = require("./custom-toolbar-functional");
var file_restrict_functional_1 = require("./file-restrict-functional");
exports.imageeditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/image-editor/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/image-editor/profile-picture', Component: profile_picture_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/image-editor/custom-toolbar', Component: custom_toolbar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/image-editor/file-restrict', Component: file_restrict_functional_1.default })));
exports.imageeditorCategory = { "default": { "name": "Default Functionalities", "category": "Image Editor" }, "profile-picture": { "name": "Profile Picture", "category": "Image Editor" }, "custom-toolbar": { "name": "Custom Toolbar", "category": "Image Editor" }, "file-restrict": { "name": "File Restriction", "category": "Image Editor" }, "defaultSample": "image-editor/default" };
