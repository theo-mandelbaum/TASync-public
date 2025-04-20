"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./pdf.component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
function ESigningPdfForms() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var viewer = React.useRef(null);
    var userMenu = React.useRef(null);
    var dialogInstance = React.useRef(null);
    var btnElement = React.useRef(null);
    var currentUser = React.useRef('andrew@mycompany.com');
    var status = React.useRef(false);
    var preventChange = React.useRef(false);
    var borderColor = React.useRef('1px solid red');
    var finishedBackground = React.useRef('#daeaf7ff');
    var opacityValue = React.useRef('0.5');
    var anneBackground = React.useRef('#eff7ef');
    var andrewBackground = React.useRef('#ffefef');
    var buttons = [
        {
            click: dlgButtonClick,
            buttonModel: {
                content: 'OK',
                isPrimary: true,
            }
        }
    ];
    var userDetails = [
        { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
        { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
    ];
    var fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };
    var dropdownComponent = function () {
        return (React.createElement("div", { id: 'e-pv-e-sign-user-field', style: { width: '245px', height: '37px', left: '0px' } },
            React.createElement("div", { className: 'e-pv-e-sign-user-dropdown' },
                React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: userMenu, id: 'userMenu', select: userChange, index: 0, popupWidth: '215px', dataSource: userDetails, width: '200px', fields: fields, itemTemplate: itemTemplate, valueTemplate: valueTemplate }))));
    };
    var itemTemplate = function (data) {
        return (React.createElement("div", { style: { display: 'flex' } },
            React.createElement("img", { className: "e-pv-e-sign-empImage", style: { maxHeight: '35px', marginTop: '7px', marginLeft: '4px', borderRadius: '50%', border: "1px solid ".concat(data.Mail === 'andrew@mycompany.com' ? 'red' : 'green') }, src: 'src/pdfviewer/images/employees/' + data['Eimg'] + '.png' }),
            React.createElement("div", null,
                React.createElement("div", { className: "e-pv-e-sign-ename", style: { height: '18px', fontSize: '14px' } },
                    " ",
                    data.Name,
                    " "),
                React.createElement("div", { className: "e-pv-e-sign-job", style: { fontSize: '12px' } },
                    " ",
                    data.Mail,
                    " "))));
    };
    var valueTemplate = function (data) {
        return (React.createElement("div", { className: "e-pv-e-sign-valueTemplate", style: { display: 'flex' } },
            React.createElement("img", { className: "e-pv-e-sign-value", style: { borderRadius: '20px', border: borderColor.current, marginLeft: '3px', }, src: 'src/pdfviewer/images/employees/' + data['Eimg'] + '.png', height: "30px", width: "30px", alt: "employee" }),
            React.createElement("div", null,
                React.createElement("div", { className: "e-pv-e-sign-name", style: { fontSize: '12px', marginLeft: '12px', alignContent: 'center' } },
                    " ",
                    data.Name,
                    " "),
                React.createElement("div", { className: "e-pv-e-sign-job", style: { fontSize: '10px', marginLeft: '11px', alignContent: 'center' } },
                    " ",
                    data.Mail,
                    " "))));
    };
    var buttonComponent = function () {
        return (React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: btnElement, id: 'e-pv-e-sign-finishbtn', cssClass: "e-outline", onClick: finishSigning, created: btnCreated }, "Finish Signing"));
    };
    var btnCreated = function () {
        btnElement.current.disabled = true;
    };
    var finishSigning = function () {
        var _a;
        for (var _i = 0, _b = viewer.current.formFieldCollections; _i < _b.length; _i++) {
            var formField = _b[_i];
            (_a = viewer.current) === null || _a === void 0 ? void 0 : _a.formDesignerModule.updateFormField(formField, { backgroundColor: finishedBackground.current });
        }
        var url = "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer/FlattenDownload";
        viewer.current.saveAsBlob().then(function (blob) {
            return convertBlobToBase64(blob);
        }).then(function (base64String) {
            var xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            var requestData = JSON.stringify({ base64String: base64String });
            xhr.onload = function () {
                if (xhr.status === 200) {
                    var responseBase64 = xhr.responseText.split('base64,')[1];
                    if (responseBase64) {
                        var blob = createBlobFromBase64(responseBase64, 'application/pdf');
                        var blobUrl = URL.createObjectURL(blob);
                        downloadDocument(blobUrl);
                        viewer.current.load(xhr.responseText, null);
                        btnElement.current.disabled = true;
                        userMenu.current.enabled = false;
                    }
                    else {
                        console.error('Invalid base64 response.');
                    }
                }
                else {
                    console.error('Download failed:', xhr.statusText);
                }
            };
            xhr.onerror = function () {
                console.error('An error occurred during the download:', xhr.statusText);
            };
            xhr.send(requestData);
        }).catch(function (error) {
            console.error('Error saving Blob:', error);
        });
    };
    var convertBlobToBase64 = function (blob) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = function () {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                }
                else {
                    reject(new Error('Failed to convert Blob to Base64'));
                }
            };
            reader.onerror = function (error) { return reject(error); };
        });
    };
    var createBlobFromBase64 = function (base64String, contentType) {
        var sliceSize = 512;
        var byteCharacters = atob(base64String);
        var byteArrays = [];
        for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            var slice = byteCharacters.slice(offset, offset + sliceSize);
            var byteNumbers = new Array(slice.length);
            for (var i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            var byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    var downloadDocument = function (blobUrl) {
        var anchorElement = document.createElement('a');
        anchorElement.href = blobUrl;
        anchorElement.target = '_parent';
        var downloadFileName = viewer.current.fileName || 'default.pdf';
        anchorElement.download = downloadFileName.endsWith('.pdf')
            ? downloadFileName
            : "".concat(downloadFileName.split('.pdf')[0], ".pdf");
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
        URL.revokeObjectURL(blobUrl);
    };
    var updateUserFormField = function () {
        var otherFormFieldDetails = viewer.current.formFieldCollections.filter(function (formField) { return formField.customData.author === "anne"; });
        var currentFormFieldDetails = viewer.current.formFieldCollections.filter(function (formField) { return formField.customData.author === "andrew"; });
        if (currentUser.current === 'andrew@mycompany.com') {
            otherFormFieldDetails.forEach(function (field) {
                if (field.value !== '') {
                    var mainFieldUpdateData = {
                        backgroundColor: finishedBackground.current,
                        isReadOnly: true
                    };
                    viewer.current.formDesigner.updateFormField(field, mainFieldUpdateData);
                    currentFormFieldDetails.forEach(function (currentField) {
                        var currentFieldUpdateData = {
                            backgroundColor: andrewBackground.current,
                            isReadOnly: true
                        };
                        viewer.current.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                    });
                }
                else {
                    currentFormFieldDetails.forEach(function (currentField) {
                        var currentFieldUpdateData = {
                            backgroundColor: andrewBackground.current,
                        };
                        viewer.current.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                    });
                }
                var otherUserField = document.getElementById(field.id + '_content_html_element');
                if (otherUserField) {
                    var currentFormField = viewer.current.formFieldCollections.find(function (formField) { return formField.id === field.id; });
                    if (currentFormField.type !== 'DropDown' && otherUserField) {
                        if (!currentFormField.value) {
                            viewer.current.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' });
                        }
                    }
                    else {
                        if (currentFormField.value.length !== 0 && otherUserField) {
                            viewer.current.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' });
                        }
                    }
                }
            });
        }
        else {
            validation(currentFormFieldDetails);
            if (!status.current) {
                currentFormFieldDetails.forEach(function (field) {
                    var currentFieldUpdateData = {
                        backgroundColor: finishedBackground.current,
                        isReadOnly: true
                    };
                    viewer.current.formDesigner.updateFormField(field, currentFieldUpdateData);
                    otherFormFieldDetails.forEach(function (otherField) {
                        var otherFieldUpdateData = {
                            backgroundColor: anneBackground.current,
                            isReadOnly: false
                        };
                        viewer.current.formDesigner.updateFormField(otherField, otherFieldUpdateData);
                    });
                });
                otherFormFieldDetails.forEach(function (field) {
                    viewer.current.formDesignerModule.updateFormField(field, { visibility: 'visible' });
                });
            }
        }
    };
    function dlgButtonClick() {
        status.current = false;
        dialogInstance.current.hide();
    }
    var validation = function (args) {
        var forms = args;
        var isAllFieldFilled = true;
        var errorMessage = "Required Field(s): ";
        var flag = false;
        var radioGroupName = "";
        for (var i = 0; i < forms.length; i++) {
            var text = "";
            if (forms[i].isRequired) {
                switch (forms[i].type.toString()) {
                    case "Checkbox":
                        if (!forms[i].isChecked) {
                            text = forms[i].name;
                        }
                        break;
                    case "RadioButton":
                        if (!flag) {
                            radioGroupName = forms[i].name;
                            if (forms[i].isSelected) {
                                flag = true;
                            }
                        }
                        break;
                    case "DropdownList":
                        if (forms[i].value.length === 0) {
                            text = forms[i].name;
                        }
                        break;
                    default:
                        if (!forms[i].value || (typeof forms[i].newValue === 'string' && forms[i].newValue === "")) {
                            text = forms[i].name;
                        }
                        break;
                }
                if (text) {
                    errorMessage = errorMessage === "Required Field(s): " ? errorMessage + text : errorMessage + ", " + text;
                }
            }
        }
        if (!flag && radioGroupName != "") {
            if (errorMessage == "Required Field(s): ")
                errorMessage += radioGroupName;
        }
        if (errorMessage != "Required Field(s): ") {
            status.current = true;
            dialogInstance.current.content = errorMessage;
            dialogInstance.current.show();
            preventChange.current = true;
        }
        else {
            status.current = false;
            preventChange.current = false;
        }
    };
    var fieldChange = function (args) {
        var errorMessage = "Required Field(s): ";
        var forms = viewer.current.formFieldCollections;
        var flag = false;
        var isAllFieldFilled = true;
        var radioGroupName = "";
        forms.forEach(function (form) {
            var text = "";
            if (form.isRequired) {
                if (form.type.toString() === "Checkbox" && !form.isChecked) {
                    text = form.name;
                    isAllFieldFilled = false;
                }
                else if (form.type === "RadioButton" && !flag) {
                    radioGroupName = form.name;
                    if (form.isSelected) {
                        flag = true;
                    }
                }
                else if (form.type.toString() !== "Checkbox" && form.type !== "RadioButton" && (!form.value || (typeof args.newValue === 'string' && args.newValue === ""))) {
                    text = form.name;
                    isAllFieldFilled = false;
                }
                else if (form.type.toString() === "DropdownList" && form.value.length === 0) {
                    text = form.name;
                    isAllFieldFilled = false;
                }
                if (text) {
                    errorMessage = errorMessage === "Required Field(s): " ? errorMessage + text : errorMessage + ", " + text;
                }
            }
        });
        if (!flag && radioGroupName != "") {
            if (errorMessage == "Required Field(s): ")
                errorMessage += radioGroupName;
            else
                errorMessage += ", " + radioGroupName;
            isAllFieldFilled = false;
        }
        if (isAllFieldFilled) {
            btnElement.current.disabled = false;
        }
        else {
            btnElement.current.disabled = true;
        }
    };
    var userChange = function (args) {
        currentUser.current = args.itemData.Mail;
        if (args.itemData.Mail == "andrew@mycompany.com") {
            borderColor.current = '1px solid red';
        }
        else {
            borderColor.current = '1px solid green';
        }
        updateUserFormField();
        if (preventChange.current) {
            args.cancel = true;
        }
    };
    var documentLoad = function () {
        viewer.current.designerMode = false;
        updateUserFormField();
    };
    return (React.createElement("div", null,
        React.createElement("div", null,
            React.createElement("div", { className: 'e-pv-e-sign control-section' },
                React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer" },
                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.ItemDirective, { template: dropdownComponent }),
                        React.createElement(ej2_react_navigations_1.ItemDirective, { align: 'Right', template: buttonComponent }))),
                React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: viewer, id: "container", enableNavigationToolbar: false, enableAnnotationToolbar: false, enableToolbar: false, enableFormDesignerToolbar: false, documentPath: "https://cdn.syncfusion.com/content/pdf/eSign_filling.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib", zoomMode: "FitToPage", downloadFileName: 'eSign_filling.pdf', documentLoad: documentLoad, formFieldPropertiesChange: fieldChange, style: { 'height': '640px' } },
                    React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] })),
                React.createElement("div", { id: 'e-pv-e-sign-dialog-target' },
                    React.createElement(ej2_react_popups_1.DialogComponent, { ref: dialogInstance, minHeight: '50px', isModal: true, width: '350px', buttons: buttons, visible: status.current, target: '#e-pv-e-sign-dialog-target' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample enables two different users to sign the document. The first user must fill out and sign their designated fields, which are visible only to them. Once the first user has completed their section, the second user can be selected to fill out and sign their own fields. After both users have signed, the document can be finalized.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "More information on the PDF Viewer instantiation can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                "."))));
}
exports.default = ESigningPdfForms;
