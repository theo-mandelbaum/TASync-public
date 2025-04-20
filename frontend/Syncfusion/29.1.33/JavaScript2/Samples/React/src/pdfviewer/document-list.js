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
var data_1 = require("./data");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var DocumentList = /** @class */ (function (_super) {
    __extends(DocumentList, _super);
    function DocumentList(props) {
        var _this = _super.call(this, props) || this;
        _this.commands = [{ type: 'View', buttonOption: { cssClass: 'e-icons e-eye e-flat', title: 'View' } },
            { type: 'Edit', buttonOption: { cssClass: 'e-icons e-edit e-flat', title: 'Edit' } }];
        _this.change = function (args) {
            if (args.checked) {
                _this.viewer.serviceUrl = '';
            }
            else {
                _this.viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
            }
        };
        _this.template = _this.gridTemplate;
        _this.state = {
            hideDialog: true
        };
        return _this;
    }
    DocumentList.prototype.dialogClose = function () {
        this.setState({ hideDialog: true });
    };
    DocumentList.prototype.dialogOpen = function () {
        this.setState({ hideDialog: false });
    };
    DocumentList.prototype.destroyed = function () {
        this.viewer.destroy();
        this.dialogInstance.destroy();
    };
    DocumentList.prototype.buttonClick = function (args) {
        this.dialogOpen();
        var viewerContainer = document.getElementById('container').ej2_instances[0];
        viewerContainer.documentPath = args.rowData.Url;
        if (args.commandColumn.buttonOption.title == 'View') {
            viewerContainer.textFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.radioButtonFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.DropdownFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.checkBoxFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.signatureFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.listBoxFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.passwordFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.initialFieldSettings = {
                isReadOnly: true,
            };
            viewerContainer.contextMenuOption = "None";
            viewerContainer.annotationSettings = { isLock: true, author: 'Guest' };
            viewerContainer.enableStickyNotesAnnotation = false;
            viewerContainer.toolbar.showAnnotationToolbar(false);
            viewerContainer.isFormDesignerToolbarVisible = false;
            viewerContainer.toolbarSettings = {
                showTooltip: true, toolbarItems: ['OpenOption', 'PageNavigationTool',
                    'MagnificationTool', 'PanTool', 'PrintOption']
            };
        }
        else {
            viewerContainer.textFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.radioButtonFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.DropdownFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.checkBoxFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.signatureFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.listBoxFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.passwordFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.initialFieldSettings = {
                isReadOnly: false,
            };
            viewerContainer.contextMenuOption = "Block";
            viewerContainer.annotationSettings = { isLock: false, author: 'Guest' };
            viewerContainer.enableStickyNotesAnnotation = true;
            viewerContainer.toolbarSettings = {
                showTooltip: true, toolbarItems: ['OpenOption', 'UndoRedoTool', 'PageNavigationTool',
                    'MagnificationTool',
                    'PanTool', 'SelectionTool', 'CommentTool', 'SubmitForm', 'AnnotationEditTool',
                    'FormDesignerEditTool', 'FreeTextAnnotationOption', 'InkAnnotationOption',
                    'ShapeAnnotationOption', 'StampAnnotation', 'SignatureOption', 'SearchOption',
                    'PrintOption', 'DownloadOption'],
                annotationToolbarItems: ['HighlightTool', 'UnderlineTool', 'StrikethroughTool',
                    'ColorEditTool', 'OpacityEditTool', 'AnnotationDeleteTool', 'StampAnnotationTool',
                    'HandWrittenSignatureTool', 'InkAnnotationTool', 'ShapeTool', 'CalibrateTool',
                    'StrokeColorEditTool', 'ThicknessEditTool', 'FreeTextAnnotationTool', 'FontFamilyAnnotationTool',
                    'FontSizeAnnotationTool', 'FontStylesAnnotationTool', 'FontAlignAnnotationTool',
                    'FontColorAnnotationTool', 'CommentPanelTool'],
                formDesignerToolbarItems: ['TextboxTool', 'PasswordTool', 'CheckBoxTool',
                    'RadioButtonTool', 'DropdownTool', 'ListboxTool', 'DrawSignatureTool', 'DeleteTool']
            };
        }
    };
    DocumentList.prototype.gridTemplate = function (props) {
        return (React.createElement("div", { className: "file-name-container" },
            React.createElement("div", { className: "file-name-content" },
                React.createElement("div", { className: "icon-and-text" },
                    React.createElement("svg", { width: "24", height: "30", viewBox: "0 0 24 30", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
                        React.createElement("path", { d: "M0 3C0 1.34315 1.34315 0 3 0H13.7574C14.553 0 15.3161 0.316071 15.8787 0.87868L23.1213 8.12132C23.6839 8.68393 24 9.44699 24 10.2426V27C24 28.6569 22.6569 30 21 30H3C1.34315 30 0 28.6569 0 27V3Z", fill: "#F54848" }),
                        React.createElement("path", { d: "M14.5 11H22V10.5042C22 9.76949 21.7304 9.0603 21.2422 8.51114L16.9463 3.67818C15.9974 2.61074 14.6374 2 13.2092 2H13V9.5C13 10.3284 13.6716 11 14.5 11Z", fill: "#FFB7B7" }),
                        React.createElement("path", { d: "M16.3787 22V14.7273H21.3432V16.1549H18.1365V17.6463H21.0271V19.0774H18.1365V22H16.3787Z", fill: "white" }),
                        React.createElement("path", { d: "M11.7622 22H9.07397V14.7273H11.7586C12.4996 14.7273 13.1377 14.8729 13.6727 15.1641C14.2101 15.4529 14.6244 15.8696 14.9156 16.4141C15.2068 16.9562 15.3524 17.6049 15.3524 18.3601C15.3524 19.1177 15.2068 19.7687 14.9156 20.3132C14.6268 20.8577 14.2137 21.2756 13.6762 21.5668C13.1388 21.8556 12.5008 22 11.7622 22ZM10.8318 20.5014H11.6947C12.1019 20.5014 12.4464 20.4328 12.7281 20.2955C13.0122 20.1558 13.2264 19.9297 13.3709 19.6172C13.5176 19.3023 13.591 18.8833 13.591 18.3601C13.591 17.8369 13.5176 17.4202 13.3709 17.1101C13.2241 16.7976 13.0074 16.5727 12.721 16.4354C12.4369 16.2957 12.0865 16.2259 11.6699 16.2259H10.8318V20.5014Z", fill: "white" }),
                        React.createElement("path", { d: "M2.55054 22V14.7273H5.5548C6.09931 14.7273 6.56924 14.8338 6.9646 15.0469C7.36233 15.2576 7.66891 15.5523 7.88434 15.9311C8.09978 16.3076 8.2075 16.7455 8.2075 17.2451C8.2075 17.7469 8.09741 18.1861 7.87724 18.5625C7.65944 18.9366 7.34812 19.2266 6.94329 19.4326C6.53846 19.6385 6.05788 19.7415 5.50153 19.7415H3.64784V18.3566H5.17483C5.43998 18.3566 5.66133 18.3104 5.83889 18.2181C6.01881 18.1257 6.15494 17.9967 6.24727 17.831C6.3396 17.6629 6.38576 17.4676 6.38576 17.2451C6.38576 17.0201 6.3396 16.826 6.24727 16.6627C6.15494 16.4969 6.01881 16.3691 5.83889 16.2791C5.65897 16.1892 5.43761 16.1442 5.17483 16.1442H4.30835V22H2.55054Z", fill: "white" })),
                    React.createElement("div", { className: "file-name-text" }, props.FileName)))));
    };
    DocumentList.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane pdfviewer-document-list' },
            React.createElement("div", { className: 'control-section col-lg-12 defaultDialogComponent dialog-target' },
                React.createElement("div", { className: "flex-container" },
                    React.createElement("label", { htmlFor: "checked", className: "switchLabel" }, " Standalone PDF Viewer "),
                    React.createElement("div", { className: "e-message render-mode-info" },
                        React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "buttonSwitch", id: "checked", change: this.change, checked: true })),
                React.createElement(ej2_react_grids_1.GridComponent, { ref: function (grid) { return _this.gridInstance = grid; }, dataSource: data_1.gridData, commandClick: this.buttonClick.bind(this), destroyed: this.destroyed.bind(this) },
                    React.createElement(ej2_react_grids_1.ColumnsDirective, null,
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'File Name', template: this.template }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Author', field: 'Author' }),
                        React.createElement(ej2_react_grids_1.ColumnDirective, { headerText: 'Actions', textAlign: 'Center', commands: this.commands })),
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_grids_1.CommandColumn] })),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultDialog", showCloseIcon: true, visible: !this.state.hideDialog, minHeight: '90%', width: '90%', height: '90%', isModal: true, ref: function (dialog) { return _this.dialogInstance = dialog; }, open: this.dialogOpen.bind(this), close: this.dialogClose.bind(this) },
                    React.createElement("div", { className: 'control-section' },
                        React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { _this.viewer = scope; }, style: { 'height': '735px' }, id: "container", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" },
                            React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print,
                                    ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This demonstration showcases the process of presenting a list of PDF documents in a grid layout and accessing the document for viewing or editing through the PDF Viewer within a dialog box.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "More information on adding annotation programmatically can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    return DocumentList;
}(sample_base_1.SampleBase));
exports.DocumentList = DocumentList;
