"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploaderCategory = exports.uploaderRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var chunk_upload_functional_1 = require("./chunk-upload-functional");
var custom_file_list_functional_1 = require("./custom-file-list-functional");
var preload_files_functional_1 = require("./preload-files-functional");
var file_validation_functional_1 = require("./file-validation-functional");
var image_preview_functional_1 = require("./image-preview-functional");
var file_upload_with_forms_functional_1 = require("./file-upload-with-forms-functional");
var custom_drop_area_functional_1 = require("./custom-drop-area-functional");
exports.uploaderRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/chunk-upload', Component: chunk_upload_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/custom-file-list', Component: custom_file_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/preload-files', Component: preload_files_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/file-validation', Component: file_validation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/image-preview', Component: image_preview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/file-upload-with-forms', Component: file_upload_with_forms_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/uploader/custom-drop-area', Component: custom_drop_area_functional_1.default })));
exports.uploaderCategory = { "default": { "name": "Default Functionalities", "category": "File Upload" }, "chunk-upload": { "name": "Chunk Upload", "category": "File Upload" }, "custom-file-list": { "name": "Template", "category": "File Upload" }, "preload-files": { "name": "Preload files", "category": "File Upload" }, "file-validation": { "name": "File Validation", "category": "File Upload" }, "image-preview": { "name": "Image Preview", "category": "File Upload" }, "file-upload-with-forms": { "name": "Form Support", "category": "File Upload" }, "custom-drop-area": { "name": "Custom Drop Area", "category": "File Upload" }, "defaultSample": "uploader/default" };
