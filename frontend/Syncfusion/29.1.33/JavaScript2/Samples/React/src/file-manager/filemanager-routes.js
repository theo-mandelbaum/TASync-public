"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filemanagerCategory = exports.filemanagerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var flat_data_functional_1 = require("./flat-data-functional");
var custom_thumbnail_functional_1 = require("./custom-thumbnail-functional");
var default_functional_1 = require("./default-functional");
var drag_drop_functional_1 = require("./drag-drop-functional");
var directory_upload_functional_1 = require("./directory-upload-functional");
var virtualization_functional_1 = require("./virtualization-functional");
var file_upload_functional_1 = require("./file-upload-functional");
var access_control_functional_1 = require("./access-control-functional");
var azure_service_functional_1 = require("./azure-service-functional");
var nodejs_file_provider_functional_1 = require("./nodejs-file-provider-functional");
var AmazonS3Provider_functional_1 = require("./AmazonS3Provider-functional");
var firebase_functional_1 = require("./firebase-functional");
var ibm_cos_node_file_provider_functional_1 = require("./ibm-cos-node-file-provider-functional");
exports.filemanagerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/flat-data', Component: flat_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/custom-thumbnail', Component: custom_thumbnail_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/drag-drop', Component: drag_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/directory-upload', Component: directory_upload_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/virtualization', Component: virtualization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/file-upload', Component: file_upload_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/access-control', Component: access_control_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/azure-service', Component: azure_service_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/nodejs-file-provider', Component: nodejs_file_provider_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/AmazonS3Provider', Component: AmazonS3Provider_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/firebase', Component: firebase_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/file-manager/ibm-cos-node-file-provider', Component: ibm_cos_node_file_provider_functional_1.default })));
exports.filemanagerCategory = { "overview": { "name": "Overview", "category": "File Manager" }, "flat-data": { "name": "Flat Data", "category": "File Manager" }, "custom-thumbnail": { "name": "Custom Thumbnails", "category": "File Manager" }, "default": { "name": "API", "category": "File Manager" }, "drag-drop": { "name": "Drag and Drop", "category": "File Manager" }, "directory-upload": { "name": "Directory upload", "category": "File Manager" }, "virtualization": { "name": "Virtualization", "category": "File Manager" }, "file-upload": { "name": "File Upload", "category": "Use Case" }, "access-control": { "name": "Access Control", "category": "Use Case" }, "azure-service": { "name": "Azure Blob Provider", "category": "Cloud Service Providers" }, "nodejs-file-provider": { "name": "NodeJS File Provider", "category": "Cloud Service Providers" }, "AmazonS3Provider": { "name": "Amazon S3 File Provider", "category": "Cloud Service Providers" }, "firebase": { "name": "Firebase Realtime File Provider", "category": "Cloud Service Providers" }, "ibm-cos-node-file-provider": { "name": "IBM Cloud File Provider", "category": "Cloud Service Providers" }, "defaultSample": "file-manager/overview" };
