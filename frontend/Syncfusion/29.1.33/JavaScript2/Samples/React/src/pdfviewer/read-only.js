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
exports.ReadOnly = void 0;
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ReadOnly = /** @class */ (function (_super) {
    __extends(ReadOnly, _super);
    function ReadOnly() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.change = function (args) {
            if (args.checked) {
                _this.viewer.serviceUrl = '';
            }
            else {
                _this.viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
            }
            _this.viewer.dataBind();
            _this.viewer.load(_this.viewer.documentPath, null);
        };
        return _this;
    }
    ReadOnly.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "flex-container" },
                    React.createElement("label", { htmlFor: "checked", className: "switchLabel" }, " Standalone PDF Viewer "),
                    React.createElement("div", { className: "e-message render-mode-info" },
                        React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                    React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "buttonSwitch", id: "checked", change: this.change, checked: true })),
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { _this.viewer = scope; }, id: "container", documentPath: "https://cdn.syncfusion.com/content/pdf/restricted-formfield.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", created: this.created, enableStickyNotesAnnotation: false, annotationSettings: { isLock: true }, style: { 'height': '640px' } },
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "The sample showcases the PDF viewer operating in a read-only mode, which restricts the ability to make changes to annotations, form fields, and also disables text selection.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "More information on the PDF Viewer instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    ReadOnly.prototype.created = function () {
        var viewer = document.getElementById('container').ej2_instances[0];
        viewer.textFieldSettings = {
            isReadOnly: true,
        };
        viewer.radioButtonFieldSettings = {
            isReadOnly: true,
        };
        viewer.DropdownFieldSettings = {
            isReadOnly: true,
        };
        viewer.checkBoxFieldSettings = {
            isReadOnly: true,
        };
        viewer.signatureFieldSettings = {
            isReadOnly: true,
        };
        viewer.listBoxFieldSettings = {
            isReadOnly: true,
        };
        viewer.passwordFieldSettings = {
            isReadOnly: true,
        };
        viewer.initialFieldSettings = {
            isReadOnly: true,
        };
        viewer.contextMenuOption = "None";
        viewer.toolbarSettings = {
            showTooltip: true, toolbarItems: ['OpenOption', 'PageNavigationTool', 'MagnificationTool', 'PanTool', 'PrintOption']
        };
        viewer.dataBind();
    };
    return ReadOnly;
}(sample_base_1.SampleBase));
exports.ReadOnly = ReadOnly;
