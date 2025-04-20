"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.documenteditorCategory = exports.documenteditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var bindUI_to_document_functional_1 = require("./bindUI-to-document-functional");
var document_list_functional_1 = require("./document-list-functional");
var mail_merge_functional_1 = require("./mail-merge-functional");
var comments_functional_1 = require("./comments-functional");
var track_changes_functional_1 = require("./track-changes-functional");
var document_protection_functional_1 = require("./document-protection-functional");
var custom_context_menu_functional_1 = require("./custom-context-menu-functional");
var auto_save_functional_1 = require("./auto-save-functional");
var toolbar_customization_functional_1 = require("./toolbar-customization-functional");
var colorpicker_customization_functional_1 = require("./colorpicker-customization-functional");
var right_to_left_functional_1 = require("./right-to-left-functional");
var print_functional_1 = require("./print-functional");
var advanced_exporting_functional_1 = require("./advanced-exporting-functional");
var table_of_contents_functional_1 = require("./table-of-contents-functional");
var notes_functional_1 = require("./notes-functional");
var autoshapes_functional_1 = require("./autoshapes-functional");
var web_layout_functional_1 = require("./web-layout-functional");
var ruler_functional_1 = require("./ruler-functional");
var heading_navigation_functional_1 = require("./heading-navigation-functional");
var character_formatting_functional_1 = require("./character-formatting-functional");
var paragraph_formatting_functional_1 = require("./paragraph-formatting-functional");
var styles_functional_1 = require("./styles-functional");
var bullets_and_numbering_functional_1 = require("./bullets-and-numbering-functional");
var links_and_bookmarks_functional_1 = require("./links-and-bookmarks-functional");
var table_formatting_functional_1 = require("./table-formatting-functional");
var section_formatting_functional_1 = require("./section-formatting-functional");
var headers_and_footers_functional_1 = require("./headers-and-footers-functional");
var form_fields_functional_1 = require("./form-fields-functional");
var multiple_columns_functional_1 = require("./multiple-columns-functional");
var chart_functional_1 = require("./chart-functional");
exports.documenteditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/bindUI-to-document', Component: bindUI_to_document_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/document-list', Component: document_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/mail-merge', Component: mail_merge_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/comments', Component: comments_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/track-changes', Component: track_changes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/document-protection', Component: document_protection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/custom-context-menu', Component: custom_context_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/auto-save', Component: auto_save_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/toolbar-customization', Component: toolbar_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/colorpicker-customization', Component: colorpicker_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/right-to-left', Component: right_to_left_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/advanced-exporting', Component: advanced_exporting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/table-of-contents', Component: table_of_contents_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/notes', Component: notes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/autoshapes', Component: autoshapes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/web-layout', Component: web_layout_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/ruler', Component: ruler_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/heading-navigation', Component: heading_navigation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/character-formatting', Component: character_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/paragraph-formatting', Component: paragraph_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/styles', Component: styles_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/bullets-and-numbering', Component: bullets_and_numbering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/links-and-bookmarks', Component: links_and_bookmarks_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/table-formatting', Component: table_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/section-formatting', Component: section_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/headers-and-footers', Component: headers_and_footers_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/form-fields', Component: form_fields_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/multiple-columns', Component: multiple_columns_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/document-editor/chart', Component: chart_functional_1.default })));
exports.documenteditorCategory = { "default": { "name": "Default Functionalities", "category": "Document Editor" }, "bindUI-to-document": { "name": "Bind UI To Document", "category": "Document Editor" }, "document-list": { "name": "Document List", "category": "File Management" }, "mail-merge": { "name": "Mail Merge", "category": "Mail Merge" }, "comments": { "name": "Comments", "category": "Review" }, "track-changes": { "name": "Track Changes", "category": "Review" }, "document-protection": { "name": "Document Protection", "category": "Security" }, "custom-context-menu": { "name": "Custom Context Menu", "category": "Customization" }, "auto-save": { "name": "Auto Save", "category": "Customization" }, "toolbar-customization": { "name": "Toolbar Customization", "category": "Customization" }, "colorpicker-customization": { "name": "Color Picker Customization", "category": "Customization" }, "right-to-left": { "name": "Right To Left", "category": "RTL" }, "print": { "name": "Print", "category": "Exporting" }, "advanced-exporting": { "name": "Advanced Exporting", "category": "Exporting" }, "table-of-contents": { "name": "Table of Contents", "category": "References" }, "notes": { "name": "Footnotes and Endnotes", "category": "References" }, "autoshapes": { "name": "Auto Shapes", "category": "Shapes" }, "web-layout": { "name": "Web Layout", "category": "View" }, "ruler": { "name": "Ruler", "category": "View" }, "heading-navigation": { "name": "Heading Navigation", "category": "View" }, "character-formatting": { "name": "Character Formatting", "category": "Editing Features" }, "paragraph-formatting": { "name": "Paragraph Formatting", "category": "Editing Features" }, "styles": { "name": "Styles", "category": "Editing Features" }, "bullets-and-numbering": { "name": "Bullets and Numbering", "category": "Editing Features" }, "links-and-bookmarks": { "name": "Hyperlinks and Bookmarks", "category": "Editing Features" }, "table-formatting": { "name": "Table Formatting", "category": "Editing Features" }, "section-formatting": { "name": "Section Formatting", "category": "Editing Features" }, "headers-and-footers": { "name": "Headers and Footers", "category": "Editing Features" }, "form-fields": { "name": "Form Fields", "category": "Editing Features" }, "multiple-columns": { "name": "Multiple Columns", "category": "Editing Features" }, "chart": { "name": "Chart Preservation", "category": "Charts" }, "defaultSample": "document-editor/default" };
