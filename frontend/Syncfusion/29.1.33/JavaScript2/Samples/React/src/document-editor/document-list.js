"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocumentList = void 0;
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
var sample_base_1 = require("../common/sample-base");
require("./default.component.css");
var word_data_1 = require("./word-data");
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
var data_1 = require("./data");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
var DocumentList = /** @class */ (function (_super) {
    __extends(DocumentList, _super);
    function DocumentList(props) {
        var _this = _super.call(this, props) || this;
        _this.hostUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
        _this.commands = [
            { type: 'View', buttonOption: { cssClass: "e-icons e-eye e-flat" } },
            { type: 'Edit', buttonOption: { cssClass: "e-icons e-edit e-flat" } }
        ];
        _this.onLoadDefault = function () {
            _this.titleBar.updateDocumentTitle();
            _this.container.documentChange = function () {
                _this.titleBar.updateDocumentTitle();
                _this.container.documentEditor.focusIn();
            };
        };
        _this.onCommandClicked = function (args) {
            var cssClass = args.target.className;
            if (cssClass.includes('e-icons e-eye e-flat')) {
                if (_this.state.dictionary.hasOwnProperty(args.rowData.FileName)) {
                    _this.container.documentEditor.open(JSON.stringify(_this.state.dictionary[args.rowData.FileName]));
                }
                _this.container.documentEditor.isReadOnly = true;
                var downloadButton = document.getElementById("documenteditor-share");
                if (downloadButton) {
                    downloadButton.style.display = "none";
                }
                var closeButton = document.getElementById("de-close");
                if (closeButton) {
                    closeButton.style.display = "none";
                }
                _this.container.documentEditor.documentName = args.rowData.FileName.replace(".docx", "");
                document.getElementById('documenteditor_title_name').textContent = _this.container.documentEditor.documentName;
                _this.container.toolbarItems = ['Open', 'Separator', 'Find'];
                _this.dialogOpen();
            }
            else if (cssClass.includes('e-icons e-edit e-flat')) {
                _this.dialogOpen();
                if (_this.state.dictionary.hasOwnProperty(args.rowData.FileName)) {
                    _this.container.documentEditor.open(JSON.stringify(_this.state.dictionary[args.rowData.FileName]));
                }
                _this.container.documentEditor.isReadOnly = false;
                var downloadButton = document.getElementById("documenteditor-share");
                if (downloadButton) {
                    downloadButton.style.display = "block";
                }
                var closeButton = document.getElementById("de-close");
                if (closeButton) {
                    closeButton.style.display = "block";
                }
                _this.container.documentEditor.documentName = args.rowData.FileName.replace(".docx", "");
                document.getElementById('documenteditor_title_name').textContent = _this.container.documentEditor.documentName;
                _this.container.toolbarItems = ['New', 'Open', 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields'];
            }
        };
        _this.state = {
            hideDialog: true,
            hideGrid: false,
            dictionary: {
                'Getting Started.docx': data_1.defaultDocument,
                'Character Formatting.docx': data_1.characterFormat,
                'Paragraph Format.docx': data_1.paragraphFormat,
                'Style.docx': data_1.styles,
                'Web Layout.docx': data_1.weblayout
            }
        };
        return _this;
    }
    DocumentList.prototype.dialogClose = function () {
        this.setState({ hideDialog: true });
    };
    DocumentList.prototype.dialogOpen = function () {
        this.setState({ hideDialog: false });
        this.container.documentEditor.resize();
    };
    DocumentList.prototype.rendereComplete = function () {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        };
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new title_bar_1.TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true, false, this.dialogInstance);
        this.container.documentEditor.documentEditorSettings.showRuler = true;
        this.onLoadDefault();
    };
    DocumentList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane documenteditor-list-sample' },
            React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return _this.gridInstance = grid; }, dataSource: word_data_1.gridData },
                React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                    React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'File Name', template: function (props) { return (React.createElement("div", { className: "file-name-container" },
                            React.createElement("div", { className: "file-name-content" },
                                React.createElement("div", { className: "icon-and-text" },
                                    React.createElement("svg", { width: "30", height: "30", viewBox: "0 0 30 30", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                                        React.createElement("path", { d: "M3 3C3 1.34315 4.34315 0 6 0H16.7574C17.553 0 18.3161 0.316071 18.8787 0.87868L26.1213 8.12132C26.6839 8.68393 27 9.44699 27 10.2426V27C27 28.6569 25.6569 30 24 30H6C4.34315 30 3 28.6569 3 27V3Z", fill: "#4889EF" }),
                                        React.createElement("path", { d: "M17.5 11H25V10.5042C25 9.76949 24.7304 9.0603 24.2422 8.51114L19.9463 3.67818C18.9974 2.61074 17.6374 2 16.2092 2H16V9.5C16 10.3284 16.6716 11 17.5 11Z", fill: "#D6E5FE" }),
                                        React.createElement("path", { d: "M10.3044 12H10.8868H11.104H11.6817L12.6231 16.3922L13.3963 12H15L13.5719 19H12.777H12.5552H11.8943L10.993 15.0093L10.1103 19H9.44945H9.22761H8.42808L7 12H8.60832L9.38188 16.3816L10.3044 12Z", fill: "white" }),
                                        React.createElement("rect", { x: "7", y: "21", width: "16", height: "2", rx: "1", fill: "white" }),
                                        React.createElement("rect", { x: "7", y: "25", width: "11", height: "2", rx: "1", fill: "white" })),
                                    React.createElement("div", { className: "file-name-text" }, props.FileName))))); } }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Author', field: 'Author' }),
                    React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Actions', commands: this.commands, textAlign: 'Center' })),
                React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.CommandColumn] })),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultDialog", visible: !this.state.hideDialog, isModal: true, width: '90%', height: '90%', zIndex: 1500, ref: function (dialog) { return _this.dialogInstance = dialog; }, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) },
                React.createElement("div", null,
                    React.createElement("div", { id: 'documenteditor_titlebar', className: "e-de-ctn-title" }),
                    React.createElement("div", { id: "documenteditor_container_body" },
                        React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: "container", showPropertiesPane: false, ref: function (scope) { _this.container = scope; }, style: { 'display': 'block' }, serviceUrl: this.hostUrl, zIndex: 3000, enableToolbar: true, locale: 'en-US', height: '780px' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demonstration showcases the process of presenting a list of Word documents in a grid layout and accessing the document for viewing or editing through the Document Editor within a dialog box.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample demonstrates opening a Word document in both read-only and editable modes using the Document Editor. It is presented in a modal dialog, initiated from a list of documents within the grid view.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can view the document in either view or edit mode using the Document Editor."),
                React.createElement("p", null,
                    "For more information about the features of the Document Editor, please refer to the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/document-editor/overview" }, "documentation section"),
                    "."))));
    };
    return DocumentList;
}(sample_base_1.SampleBase));
exports.DocumentList = DocumentList;
