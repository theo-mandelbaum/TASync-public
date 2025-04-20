"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
function FormDesignerComponent() {
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
            React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { id: "container", ref: function (scope) { viewer = scope; }, documentPath: "https://cdn.syncfusion.com/content/pdf/form-designer.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib", documentLoad: documentLoaded, validateFormFields: validateFormFields, enableFormFieldsValidation: true, showNotificationDialog: false, style: { 'height': '640px' } },
                React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the creation of the supported Form fields in the PDF Viewer such as Textbox, Password, Checkbox, Radio Button, Drop Down, List box, Signature, and Initial. We can also customize these fields and can include new fields through the user interaction by switching to the designer mode.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "More information on form designer support can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                "."))));
    function documentLoaded(args) {
        if (args.documentName === 'form-designer.pdf') {
            viewer.formDesignerModule.addFormField("Textbox", { name: "First Name", bounds: { X: 146, Y: 229, Width: 150, Height: 24 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "Middle Name", bounds: { X: 338, Y: 229, Width: 150, Height: 24 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "Last Name", bounds: { X: 530, Y: 229, Width: 150, Height: 24 } });
            viewer.formDesignerModule.addFormField("RadioButton", { bounds: { X: 148, Y: 289, Width: 18, Height: 18 }, name: "Gender", isSelected: false });
            viewer.formDesignerModule.addFormField("RadioButton", { bounds: { X: 292, Y: 289, Width: 18, Height: 18 }, name: "Gender", isSelected: false });
            viewer.formDesignerModule.addFormField("Textbox", { name: "DOB Month", bounds: { X: 146, Y: 320, Width: 35, Height: 24 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "DOB Date", bounds: { X: 193, Y: 320, Width: 35, Height: 24 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "DOB Year", bounds: { X: 242, Y: 320, Width: 35, Height: 24 } });
            viewer.formDesignerModule.addFormField("InitialField", { name: "Agree", bounds: { X: 148, Y: 408, Width: 200, Height: 43 } });
            viewer.formDesignerModule.addFormField("InitialField", { name: "Do Not Agree", bounds: { X: 148, Y: 466, Width: 200, Height: 43 } });
            viewer.formDesignerModule.addFormField("CheckBox", { name: "Text Message", bounds: { X: 56, Y: 664, Width: 20, Height: 20 }, isChecked: false });
            viewer.formDesignerModule.addFormField("CheckBox", { name: "Email", bounds: { X: 242, Y: 664, Width: 20, Height: 20 }, isChecked: false });
            viewer.formDesignerModule.addFormField("CheckBox", { name: "Appointment Reminder", bounds: { X: 56, Y: 740, Width: 20, Height: 20 }, isChecked: false });
            viewer.formDesignerModule.addFormField("CheckBox", { name: "Request for Customerservice", bounds: { X: 56, Y: 778, Width: 20, Height: 20 }, isChecked: false });
            viewer.formDesignerModule.addFormField("CheckBox", { name: "Information Billing", bounds: { X: 290, Y: 740, Width: 20, Height: 20 }, isChecked: false });
            viewer.formDesignerModule.addFormField("Textbox", { name: "My Email", bounds: { X: 146, Y: 850, Width: 200, Height: 24 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "My Phone", bounds: { X: 482, Y: 850, Width: 200, Height: 24 } });
            viewer.formDesignerModule.addFormField("SignatureField", { name: "Sign", bounds: { X: 57, Y: 923, Width: 200, Height: 43 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "DOS Month", bounds: { X: 386, Y: 923, Width: 35, Height: 24 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "DOS Date", bounds: { X: 434, Y: 923, Width: 35, Height: 24 } });
            viewer.formDesignerModule.addFormField("Textbox", { name: "DOS Year", bounds: { X: 482, Y: 923, Width: 35, Height: 24 } });
        }
    }
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
exports.default = FormDesignerComponent;
