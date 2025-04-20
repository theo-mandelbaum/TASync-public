"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.richtexteditorCategory = exports.richtexteditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var tools_functional_1 = require("./tools-functional");
var rich_text_editor_functional_1 = require("./rich-text-editor-functional");
var image_functional_1 = require("./image-functional");
var insert_media_functional_1 = require("./insert-media-functional");
var inline_functional_1 = require("./inline-functional");
var paste_cleanup_functional_1 = require("./paste-cleanup-functional");
var format_painter_functional_1 = require("./format-painter-functional");
var iframe_functional_1 = require("./iframe-functional");
var print_functional_1 = require("./print-functional");
var ajax_load_functional_1 = require("./ajax-load-functional");
var resize_editor_functional_1 = require("./resize-editor-functional");
var api_functional_1 = require("./api-functional");
var enter_key_configuration_functional_1 = require("./enter-key-configuration-functional");
var client_side_events_functional_1 = require("./client-side-events-functional");
var blog_posting_functional_1 = require("./blog-posting-functional");
var auto_save_functional_1 = require("./auto-save-functional");
var file_browser_functional_1 = require("./file-browser-functional");
var insert_emoticons_functional_1 = require("./insert-emoticons-functional");
var online_html_editor_functional_1 = require("./online-html-editor-functional");
var image_editor_integration_functional_1 = require("./image-editor-integration-functional");
var mail_merge_functional_1 = require("./mail-merge-functional");
var export_document_functional_1 = require("./export-document-functional");
var import_word_functional_1 = require("./import-word-functional");
var mention_integration_functional_1 = require("./mention-integration-functional");
var smart_suggestion_functional_1 = require("./smart-suggestion-functional");
var types_functional_1 = require("./types-functional");
var quick_format_toolbar_functional_1 = require("./quick-format-toolbar-functional");
var insert_special_characters_functional_1 = require("./insert-special-characters-functional");
exports.richtexteditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/tools', Component: tools_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/rich-text-editor', Component: rich_text_editor_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/image', Component: image_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/insert-media', Component: insert_media_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/inline', Component: inline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/paste-cleanup', Component: paste_cleanup_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/format-painter', Component: format_painter_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/iframe', Component: iframe_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/ajax-load', Component: ajax_load_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/resize-editor', Component: resize_editor_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/enter-key-configuration', Component: enter_key_configuration_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/client-side-events', Component: client_side_events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/blog-posting', Component: blog_posting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/auto-save', Component: auto_save_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/file-browser', Component: file_browser_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/insert-emoticons', Component: insert_emoticons_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/online-html-editor', Component: online_html_editor_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/image-editor-integration', Component: image_editor_integration_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/mail-merge', Component: mail_merge_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/export-document', Component: export_document_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/import-word', Component: import_word_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/mention-integration', Component: mention_integration_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/smart-suggestion', Component: smart_suggestion_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/types', Component: types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/quick-format-toolbar', Component: quick_format_toolbar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rich-text-editor/insert-special-characters', Component: insert_special_characters_functional_1.default })));
exports.richtexteditorCategory = { "tools": { "name": "Overview", "category": "Rich Text Editor" }, "rich-text-editor": { "name": "Default Functionalities", "category": "Rich Text Editor" }, "image": { "name": "Image", "category": "Rich Text Editor" }, "insert-media": { "name": "Insert Media", "category": "Rich Text Editor" }, "inline": { "name": "Inline", "category": "Rich Text Editor" }, "paste-cleanup": { "name": "Paste from MS Word", "category": "Rich Text Editor" }, "format-painter": { "name": "Format Painter", "category": "Rich Text Editor" }, "iframe": { "name": "IFrame", "category": "Rich Text Editor" }, "print": { "name": "Print", "category": "Rich Text Editor" }, "ajax-load": { "name": "Ajax Content", "category": "Rich Text Editor" }, "resize-editor": { "name": "Resizable Editor", "category": "Rich Text Editor" }, "api": { "name": "API", "category": "Rich Text Editor" }, "enter-key-configuration": { "name": "Enter Key Configuration", "category": "Rich Text Editor" }, "client-side-events": { "name": "Events", "category": "Rich Text Editor" }, "blog-posting": { "name": "Use Case", "category": "Rich Text Editor" }, "auto-save": { "name": "Auto Save", "category": "Rich Text Editor" }, "file-browser": { "name": "File Browser", "category": "Rich Text Editor" }, "insert-emoticons": { "name": "Insert Emoticons", "category": "Rich Text Editor" }, "online-html-editor": { "name": "Online Html Editor", "category": "Rich Text Editor" }, "image-editor-integration": { "name": "Image Editor Integration", "category": "Rich Text Editor" }, "mail-merge": { "name": "Mail Merge", "category": "Rich Text Editor" }, "export-document": { "name": "Export to Word / PDF", "category": "Export / Import" }, "import-word": { "name": "Import from Word", "category": "Export / Import" }, "mention-integration": { "name": "@ Mention", "category": "Mention Integration" }, "smart-suggestion": { "name": "Smart Suggestion", "category": "Mention Integration" }, "types": { "name": "Type", "category": "Toolbar" }, "quick-format-toolbar": { "name": "Quick Format Toolbar", "category": "Toolbar" }, "insert-special-characters": { "name": "Insert Special Characters", "category": "Custom Tool" }, "defaultSample": "rich-text-editor/tools" };
