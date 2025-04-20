"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
function Default() {
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
            React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { viewer = scope; }, id: "container", documentPath: "https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", documentLoad: documentLoaded, style: { 'height': '640px' } },
                React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample showcases the page organization features of the PDF Viewer component, allowing users to effortlessly insert, delete, rearrange, copy, import, undo, redo, and rotate pages. Additionally, users can select all pages for collective adjustments and save changes instantly or download the edited document.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Explore the comprehensive page organization capabilities of the PDF Viewer component through this sample. Users can seamlessly manage the PDF documents with the following functionalities:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Add new pages to the document to integrate additional content seamlessly."),
                React.createElement("li", null, "Remove unnecessary pages with ease, streamlining document management."),
                React.createElement("li", null,
                    "Resolve orientation issues by rotating pages clockwise ",
                    React.createElement("code", null, "right"),
                    "  or counterclockwise ",
                    React.createElement("code", null, "left"),
                    " as required."),
                React.createElement("li", null, "Conveniently select all pages for uniform adjustments and modifications."),
                React.createElement("li", null, "Rearrange pages by dragging and dropping selected pages to the desired position."),
                React.createElement("li", null, "Copy pages by selecting the thumbnails and using the copy option; duplicates are added next to the selected pages."),
                React.createElement("li", null, "Click the \"Import Documents\" icon in the toolbar to import a document. If any thumbnail is selected, the new document will be imported next to it; otherwise, it will be imported as the first thumbnail."),
                React.createElement("li", null, "Undo and redo actions are available at the organize pages dialog."),
                React.createElement("li", null,
                    "Enjoy real-time updates as any changes made to the page organization are instantly reflected within the PDF Viewer, when you click on the ",
                    React.createElement("code", null, "Save"),
                    " button."),
                React.createElement("li", null,
                    "Utilize the ",
                    React.createElement("code", null, "Save As"),
                    " feature to preserve edits, enabling users to download the modified version of the PDF document for future reference.")),
            React.createElement("p", null,
                "More information on the PDF Viewer instantiation can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                "."))));
    function documentLoaded() {
        if (isInitialLoading) {
            viewer.isPageOrganizerOpen = true;
            isInitialLoading = false;
        }
        else {
            viewer.isPageOrganizerOpen = false;
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
exports.default = Default;
