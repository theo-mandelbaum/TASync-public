"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
function HandWrittenSignature() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var viewer;
    var isInitialLoading = true;
    return (React.createElement("div", null,
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "flex-container" },
                React.createElement("label", { htmlFor: "checked", className: "switchLabel" }, " Standalone PDF Viewer "),
                React.createElement("div", { className: "e-message render-mode-info" },
                    React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "buttonSwitch", id: "checked", change: change, checked: true })),
            React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { viewer = scope; }, id: "container", documentPath: "https://cdn.syncfusion.com/content/pdf/handwritten-signature.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", documentLoad: documentLoaded, style: { 'height': '640px' } },
                React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Handwritten signature and initial support of the PDF Viewer. The signature or initial support reduces the paperwork of reviewing the contents and it is verified digitally.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In the PDF Viewer component, we can explicitly open the Handwritten signature dialog or initial dialog using the method setAnnotationMode."),
            React.createElement("p", null,
                "More information on the PDF Viewer instantiation can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                "."))));
    function documentLoaded() {
        if (isInitialLoading) {
            viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
            isInitialLoading = false;
        }
    }
    function change(args) {
        if (args.checked) {
            viewer.serviceUrl = '';
        }
        else {
            viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
        }
        viewer.dataBind();
        viewer.load(viewer.documentPath, null);
    }
}
exports.default = HandWrittenSignature;
