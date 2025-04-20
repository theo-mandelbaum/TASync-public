"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
function FormFilling() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var viewer;
    return (React.createElement("div", null,
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "flex-container" },
                React.createElement("label", { htmlFor: "checked", className: "switchLabel" }, " Standalone PDF Viewer "),
                React.createElement("div", { className: "e-message render-mode-info" },
                    React.createElement("span", { className: "e-msg-icon render-mode-info-icon", title: "Turn OFF to render the PDF Viewer as server-backed" })),
                React.createElement(ej2_react_buttons_1.SwitchComponent, { cssClass: "buttonSwitch", id: "checked", change: change, checked: true })),
            React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "container", ref: function (scope) { viewer = scope; }, documentPath: "https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", validateFormFields: validateFormFields, enableFormFieldsValidation: true, showNotificationDialog: false, style: { 'height': '640px' } },
                React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the form filling features of PDF Viewer and allows you to edit the form fields, download and print the edited form fields PDF documents.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The PDF Viewer component enables you to view and print the PDF files. This sample demonstrate the following key features of PDF Viewer,"),
            React.createElement("ul", null,
                React.createElement("li", null, "View the PDF document"),
                React.createElement("li", null, "Core interactions - Scrolling, Zooming, panning and page navigation"),
                React.createElement("li", null, "Built-in toolbar"),
                React.createElement("li", null, "Select and copy text from PDF file"),
                React.createElement("li", null, "Search a text easily across the PDF document"),
                React.createElement("li", null, "Easy navigation with the help of Bookmarks, thumbnails, hyperlinks and table of contents"),
                React.createElement("li", null, "View modes - fit to page and fit to width"),
                React.createElement("li", null, "Print the entire document or a specific page directly from the browser.")),
            React.createElement("p", null,
                "More information on the PDF Viewer instantiation can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                "."))));
    function validateFormFields(args) {
        var errorMessage = "Required Field(s): ";
        var forms = viewer.formFieldCollections;
        var flag = false;
        var radioGroupName = "";
        for (var i = 0; i < forms.length; i++) {
            var text = "";
            if (forms[i].isRequired == true) {
                if (forms[i].type.toString() == "Checkbox" && forms[i].isChecked == false) {
                    text = forms[i].name;
                }
                else if (forms[i].type == "RadioButton" && flag == false) {
                    radioGroupName = forms[i].name;
                    if (forms[i].isSelected == true)
                        flag = true;
                }
                else if (forms[i].type.toString() != "Checkbox" && forms[i].type != "RadioButton" && forms[i].value == "") {
                    text = forms[i].name;
                }
                if (text != "") {
                    if (errorMessage == "Required Field(s): ") {
                        errorMessage += text;
                    }
                    else {
                        errorMessage += ", " + text;
                    }
                }
            }
        }
        if (!flag && radioGroupName != "") {
            if (errorMessage == "Required Field(s): ")
                errorMessage += radioGroupName;
            else
                errorMessage += ", " + radioGroupName;
        }
        if (errorMessage != "Required Field(s): ") {
            viewer.showNotificationPopup(errorMessage);
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
exports.default = FormFilling;
