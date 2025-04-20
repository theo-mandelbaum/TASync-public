"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_grids_1 = require("@syncfusion/ej2-react-grids");
require("./default.component.css");
var word_data_1 = require("./word-data");
var sample_base_1 = require("../common/sample-base");
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
var data_1 = require("./data");
var DocumentList = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var _a = (0, react_1.useState)({
        'Getting Started.docx': data_1.defaultDocument,
        'Character Formatting.docx': data_1.characterFormat,
        'Paragraph Format.docx': data_1.paragraphFormat,
        'Style.docx': data_1.styles,
        'Web Layout.docx': data_1.weblayout
    }), dictionary = _a[0], setDictionary = _a[1];
    var commands = [
        { type: 'View', buttonOption: { cssClass: "e-icons e-eye e-flat" } },
        { type: 'Edit', buttonOption: { cssClass: "e-icons e-edit e-flat" } }
    ];
    var dialogInstance = (0, react_1.useRef)(null);
    var gridInstance = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), isDialogOpen = _b[0], setDialogOpen = _b[1];
    var _c = (0, react_1.useState)(true), isGridOpen = _c[0], setGridOpen = _c[1];
    var hostUrl = "https://ej2services.syncfusion.com/production/web-services/api/documenteditor/";
    var container = (0, react_1.useRef)(null);
    var titleBar;
    var onLoadDefault = function () {
        titleBar.updateDocumentTitle();
        container.current.documentChange = function () {
            titleBar.updateDocumentTitle();
            container.current.documentEditor.focusIn();
        };
        container.current.documentEditorSettings.showRuler = true;
    };
    var rendereComplete = function () {
        window.onbeforeunload = function () {
            return "Want to save your changes?";
        };
        container.current.documentEditor.pageOutline = "#E0E0E0";
        container.current.documentEditor.acceptTab = true;
        container.current.documentEditor.resize();
        titleBar = new title_bar_1.TitleBar(document.getElementById("documenteditor_titlebar"), container.current.documentEditor, true, false, dialogInstance.current);
        onLoadDefault();
    };
    var dialogClose = function () {
        setDialogOpen(false);
    };
    var dialogOpen = function () {
        setDialogOpen(true);
        container.current.documentEditor.resize();
    };
    var onCommandClicked = function (args) {
        var cssClass = args.target.className;
        if (cssClass.includes('e-icons e-eye e-flat')) {
            setDialogOpen(true);
            setGridOpen(false);
            if (dictionary.hasOwnProperty(args.rowData.FileName)) {
                container.current.documentEditor.open(JSON.stringify(dictionary[args.rowData.FileName]));
            }
            container.current.documentEditor.isReadOnly = true;
            container.current.documentEditor.enableContextMenu = false;
            container.current.resize();
            var downloadButton = document.getElementById("documenteditor-share");
            if (downloadButton) {
                downloadButton.style.display = "none";
            }
            var closeButton = document.getElementById("de-close");
            if (closeButton) {
                closeButton.style.display = "block";
            }
            container.current.documentEditor.documentName = args.rowData.FileName.replace(".docx", "");
            document.getElementById("documenteditor_title_name").textContent = container.current.documentEditor.documentName;
            container.current.toolbarItems = ['Open', 'Separator', 'Find'];
        }
        else if (cssClass.includes('e-icons e-edit e-flat')) {
            setDialogOpen(true);
            setGridOpen(false);
            if (dictionary.hasOwnProperty(args.rowData.FileName)) {
                container.current.documentEditor.open(JSON.stringify(dictionary[args.rowData.FileName]));
            }
            container.current.documentEditor.isReadOnly = false;
            container.current.documentEditor.enableContextMenu = true;
            container.current.resize();
            var downloadButton = document.getElementById("documenteditor-share");
            if (downloadButton) {
                downloadButton.style.display = "block";
            }
            var closeButton = document.getElementById("de-close");
            if (closeButton) {
                closeButton.style.display = "block";
            }
            container.current.documentEditor.documentName = args.rowData.FileName.replace(".docx", "");
            document.getElementById("documenteditor_title_name").textContent = container.current.documentEditor.documentName;
            container.current.toolbarItems = ['New', 'Open', 'Separator', 'Undo', 'Redo', 'Separator', 'Image', 'Table', 'Hyperlink', 'Bookmark', 'TableOfContents', 'Separator', 'Header', 'Footer', 'PageSetup', 'PageNumber', 'Break', 'InsertFootnote', 'InsertEndnote', 'Separator', 'Find', 'Separator', 'Comments', 'TrackChanges', 'Separator', 'LocalClipboard', 'RestrictEditing', 'Separator', 'FormFields', 'UpdateFields'];
        }
    };
    return (React.createElement("div", { className: "control-pane documenteditor-list-sample" },
        React.createElement(ej2_react_grids_1.GridComponent, { ref: gridInstance, dataSource: word_data_1.gridData, commandClick: onCommandClicked },
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
                React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Actions', commands: commands, textAlign: 'Center' })),
            React.createElement(ej2_react_grids_1.Inject, { services: [ej2_react_grids_1.CommandColumn] })),
        React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultDialog", ref: dialogInstance, isModal: true, visible: isDialogOpen, width: '90%', height: '90%', zIndex: 1500, open: dialogOpen, close: dialogClose },
            React.createElement("div", null,
                React.createElement("div", { id: "documenteditor_titlebar", className: "e-de-ctn-title" }),
                React.createElement("div", { id: "documenteditor_container_body" },
                    React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { showPropertiesPane: false, id: "container", height: '780px', ref: container, style: { display: "block" }, serviceUrl: hostUrl, zIndex: 3000, enableToolbar: true, locale: "en-US" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This demonstration showcases the process of presenting a list of Word documents in a grid layout and accessing the document for viewing or editing through the Document Editor within a dialog box.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can view the document in either view or edit mode using the Document Editor."),
            React.createElement("p", null,
                "For more information about the features of the Document Editor, please refer to the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/document-editor/overview" }, "documentation section"),
                "."))));
};
exports.default = DocumentList;
