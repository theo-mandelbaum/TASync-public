"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pdfviewerCategory = exports.pdfviewerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var read_only_functional_1 = require("./read-only-functional");
var document_list_functional_1 = require("./document-list-functional");
var multi_format_viewer_functional_1 = require("./multi-format-viewer-functional");
var organize_pages_functional_1 = require("./organize-pages-functional");
var redaction_functional_1 = require("./redaction-functional");
var custom_toolbar_functional_1 = require("./custom-toolbar-functional");
var custom_context_menu_functional_1 = require("./custom-context-menu-functional");
var right_to_left_functional_1 = require("./right-to-left-functional");
var form_filling_functional_1 = require("./form-filling-functional");
var form_designer_functional_1 = require("./form-designer-functional");
var esigning_form_designer_functional_1 = require("./esigning-form-designer-functional");
var esigning_pdf_forms_functional_1 = require("./esigning-pdf-forms-functional");
var annotations_functional_1 = require("./annotations-functional");
var programmatic_operations_functional_1 = require("./programmatic-operations-functional");
var hand_written_functional_1 = require("./hand-written-functional");
var invisible_signature_functional_1 = require("./invisible-signature-functional");
exports.pdfviewerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/read-only', Component: read_only_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/document-list', Component: document_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/multi-format-viewer', Component: multi_format_viewer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/organize-pages', Component: organize_pages_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/redaction', Component: redaction_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/custom-toolbar', Component: custom_toolbar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/custom-context-menu', Component: custom_context_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/right-to-left', Component: right_to_left_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/form-filling', Component: form_filling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/form-designer', Component: form_designer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/esigning-form-designer', Component: esigning_form_designer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/esigning-pdf-forms', Component: esigning_pdf_forms_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/annotations', Component: annotations_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/programmatic-operations', Component: programmatic_operations_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/hand-written', Component: hand_written_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pdfviewer/invisible-signature', Component: invisible_signature_functional_1.default })));
exports.pdfviewerCategory = { "default": { "name": "Default Functionalities", "category": "PDF Viewer" }, "read-only": { "name": "Read-Only", "category": "Document Security" }, "document-list": { "name": "Document List", "category": "File Management" }, "multi-format-viewer": { "name": " Multi-Format Viewer", "category": "File Management" }, "organize-pages": { "name": "Organize Pages", "category": "Editor" }, "redaction": { "name": "Redaction", "category": "Editor" }, "custom-toolbar": { "name": "Toolbar", "category": "Customization" }, "custom-context-menu": { "name": "Context Menu", "category": "Customization" }, "right-to-left": { "name": "Right To Left", "category": "Localization" }, "form-filling": { "name": "Form Filling", "category": "PDF Form" }, "form-designer": { "name": "Form Designer", "category": "PDF Form" }, "esigning-form-designer": { "name": "eSigning Form Designer", "category": "PDF Form" }, "esigning-pdf-forms": { "name": "eSigning PDF Forms", "category": "PDF Form" }, "annotations": { "name": "Annotations", "category": "Annotation" }, "programmatic-operations": { "name": "Programmatic Operations", "category": "Annotation" }, "hand-written": { "name": "Handwritten Signature", "category": "Signature" }, "invisible-signature": { "name": "Invisible Signature", "category": "Signature" }, "defaultSample": "pdfviewer/default" };
