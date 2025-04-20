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
exports.ESigningPdfForms = void 0;
var React = require("react");
var ej2_react_pdfviewer_1 = require("@syncfusion/ej2-react-pdfviewer");
var sample_base_1 = require("../common/sample-base");
require("./pdf.component.css");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ESigningPdfForms = /** @class */ (function (_super) {
    __extends(ESigningPdfForms, _super);
    function ESigningPdfForms() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentUser = 'andrew@mycompany.com';
        _this.status = false;
        _this.preventChange = false;
        _this.borderColor = '1px solid red';
        _this.finishedBackground = '#daeaf7ff';
        _this.opacityValue = '0.5';
        _this.andrewBackground = '#eff7ef';
        _this.anneBackground = '#ffefef';
        _this.buttons = [
            {
                buttonModel: {
                    content: 'OK',
                    isPrimary: true,
                },
                'click': function () {
                    _this.status = false;
                    _this.dialogInstance.hide();
                }
            }
        ];
        _this.userDetails = [
            { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
            { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
        ];
        _this.fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };
        _this.dropdownComponent = function () {
            return (React.createElement("div", { id: 'e-pv-e-sign-user-field', style: { width: '245px', height: '37px', left: '0px' } },
                React.createElement("div", { className: 'e-pv-e-sign-user-dropdown' },
                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { ref: function (scope) { _this.userMenu = scope; }, id: 'this.userMenu', select: _this.userChange, index: 0, popupWidth: '215px', dataSource: _this.userDetails, width: '200px', fields: _this.fields, itemTemplate: _this.itemTemplate, valueTemplate: _this.valueTemplate }))));
        };
        _this.itemTemplate = function (data) {
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
        _this.valueTemplate = function (data) {
            return (React.createElement("div", { className: "e-pv-e-sign valueTemplate", style: { display: 'flex' } },
                React.createElement("img", { className: "e-pv-e-sign-value", style: { borderRadius: '20px', marginLeft: '3px', border: _this.borderColor }, src: 'src/pdfviewer/images/employees/' + data['Eimg'] + '.png', height: "30px", width: "30px", alt: "employee" }),
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
        _this.buttonComponent = function () {
            return (React.createElement(ej2_react_buttons_1.ButtonComponent, { ref: function (scope) { _this.btnElement = scope; }, id: 'e-pv-e-sign-finishbtn', cssClass: "e-outline", onClick: _this.finishSigning, created: _this.btnCreated }, "Finish Signing"));
        };
        _this.btnCreated = function () {
            _this.btnElement.disabled = true;
        };
        _this.finishSigning = function (args) {
            var _a;
            for (var _i = 0, _b = _this.viewer.formFieldCollections; _i < _b.length; _i++) {
                var formField = _b[_i];
                (_a = _this.viewer) === null || _a === void 0 ? void 0 : _a.formDesignerModule.updateFormField(formField, { backgroundColor: _this.finishedBackground });
            }
            var url = "https://ej2services.syncfusion.com/production/web-services/api/pdfviewer/FlattenDownload";
            _this.viewer.saveAsBlob().then(function (blob) {
                return _this.convertBlobToBase64(blob);
            }).then(function (base64String) {
                var xhr = new XMLHttpRequest();
                xhr.open('POST', url, true);
                xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
                var requestData = JSON.stringify({ base64String: base64String });
                xhr.onload = function () {
                    if (xhr.status === 200) {
                        var responseBase64 = xhr.responseText.split('base64,')[1];
                        if (responseBase64) {
                            var blob = _this.createBlobFromBase64(responseBase64, 'application/pdf');
                            var blobUrl = URL.createObjectURL(blob);
                            _this.downloadDocument(blobUrl);
                            _this.viewer.load(xhr.responseText, null);
                            _this.btnElement.disabled = true;
                            _this.userMenu.enabled = false;
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
        _this.convertBlobToBase64 = function (blob) {
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
        _this.createBlobFromBase64 = function (base64String, contentType) {
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
        _this.downloadDocument = function (blobUrl) {
            var anchorElement = document.createElement('a');
            anchorElement.href = blobUrl;
            anchorElement.target = '_parent';
            var downloadFileName = _this.viewer.fileName || 'default.pdf';
            anchorElement.download = downloadFileName.endsWith('.pdf')
                ? downloadFileName
                : "".concat(downloadFileName.split('.pdf')[0], ".pdf");
            document.body.appendChild(anchorElement);
            anchorElement.click();
            document.body.removeChild(anchorElement);
            URL.revokeObjectURL(blobUrl);
        };
        _this.updateUserFormField = function () {
            var otherFormFieldDetails = _this.viewer.formFieldCollections.filter(function (formField) { return formField.customData.author === "anne"; });
            var currentFormFieldDetails = _this.viewer.formFieldCollections.filter(function (formField) { return formField.customData.author === "andrew"; });
            if (_this.currentUser === 'andrew@mycompany.com') {
                otherFormFieldDetails.forEach(function (field) {
                    if (field.value !== '') {
                        var mainFieldUpdateData = {
                            backgroundColor: _this.finishedBackground,
                            isReadOnly: true
                        };
                        _this.viewer.formDesigner.updateFormField(field, mainFieldUpdateData);
                        currentFormFieldDetails.forEach(function (currentField) {
                            var currentFieldUpdateData = {
                                backgroundColor: _this.andrewBackground,
                                isReadOnly: true
                            };
                            _this.viewer.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                        });
                    }
                    else {
                        currentFormFieldDetails.forEach(function (currentField) {
                            var currentFieldUpdateData = {
                                backgroundColor: _this.andrewBackground,
                            };
                            _this.viewer.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                        });
                    }
                    var otherUserField = document.getElementById(field.id + '_content_html_element');
                    if (otherUserField) {
                        var currentFormField = _this.viewer.formFieldCollections.find(function (formField) { return formField.id === field.id; });
                        if (currentFormField.type !== 'DropDown' && otherUserField) {
                            if (!currentFormField.value) {
                                _this.viewer.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' });
                            }
                        }
                        else {
                            if (currentFormField.value.length !== 0 && otherUserField) {
                                _this.viewer.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' });
                            }
                        }
                    }
                });
            }
            else {
                _this.validation(currentFormFieldDetails);
                if (!_this.status) {
                    currentFormFieldDetails.forEach(function (field) {
                        var currentFieldUpdateData = {
                            backgroundColor: _this.finishedBackground,
                            isReadOnly: true
                        };
                        _this.viewer.formDesigner.updateFormField(field, currentFieldUpdateData);
                        otherFormFieldDetails.forEach(function (otherField) {
                            var otherFieldUpdateData = {
                                backgroundColor: _this.anneBackground,
                                isReadOnly: false
                            };
                            _this.viewer.formDesigner.updateFormField(otherField, otherFieldUpdateData);
                        });
                    });
                    otherFormFieldDetails.forEach(function (field) {
                        _this.viewer.formDesignerModule.updateFormField(field, { visibility: 'visible' });
                    });
                }
            }
        };
        _this.validation = function (args) {
            var errorMessage = "Required Field(s): ";
            var forms = args;
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
                _this.status = true;
                _this.dialogInstance.content = errorMessage;
                _this.dialogInstance.show();
                _this.preventChange = true;
            }
            else {
                _this.status = false;
                _this.preventChange = false;
            }
        };
        _this.fieldChange = function (args) {
            var errorMessage = "Required Field(s): ";
            var forms = _this.viewer.formFieldCollections;
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
                _this.btnElement.disabled = false;
            }
            else {
                _this.btnElement.disabled = true;
            }
        };
        _this.userChange = function (args) {
            _this.currentUser = args.itemData.Mail;
            if (args.itemData.Mail == "andrew@mycompany.com") {
                _this.borderColor = '1px solid red';
            }
            else {
                _this.borderColor = '1px solid green';
            }
            _this.updateUserFormField();
            if (_this.preventChange) {
                args.cancel = true;
            }
        };
        _this.documentLoad = function () {
            _this.viewer.designerMode = false;
            _this.updateUserFormField();
        };
        return _this;
    }
    ESigningPdfForms.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement("div", null,
                React.createElement("div", { className: 'e-pv-e-sign control-section' },
                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "e-pv-e-sign-toolbar-user-viewer" },
                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.ItemDirective, { template: this.dropdownComponent }),
                            React.createElement(ej2_react_navigations_1.ItemDirective, { align: 'Right', template: this.buttonComponent }))),
                    React.createElement(ej2_react_pdfviewer_1.PdfViewerComponent, { ref: function (scope) { _this.viewer = scope; }, id: "container", enableNavigationToolbar: false, enableAnnotationToolbar: false, enableToolbar: false, enableFormDesignerToolbar: false, documentPath: "https://cdn.syncfusion.com/content/pdf/eSign_filling.pdf", resourceUrl: "https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib", zoomMode: "FitToPage", downloadFileName: 'eSign_filling.pdf', documentLoad: this.documentLoad, formFieldPropertiesChange: this.fieldChange, style: { 'height': '640px' } },
                        React.createElement(ej2_react_pdfviewer_1.Inject, { services: [ej2_react_pdfviewer_1.Toolbar, ej2_react_pdfviewer_1.Magnification, ej2_react_pdfviewer_1.Navigation, ej2_react_pdfviewer_1.LinkAnnotation, ej2_react_pdfviewer_1.BookmarkView, ej2_react_pdfviewer_1.ThumbnailView, ej2_react_pdfviewer_1.Print, ej2_react_pdfviewer_1.TextSelection, ej2_react_pdfviewer_1.TextSearch, ej2_react_pdfviewer_1.Annotation, ej2_react_pdfviewer_1.FormFields, ej2_react_pdfviewer_1.FormDesigner, ej2_react_pdfviewer_1.PageOrganizer] })),
                    React.createElement("div", { id: 'e-pv-e-sign-dialog-target' },
                        React.createElement(ej2_react_popups_1.DialogComponent, { ref: function (scope) { _this.dialogInstance = scope; }, minHeight: '50px', isModal: true, width: '350px', buttons: this.buttons, visible: this.status, target: '#e-pv-e-sign-dialog-target' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample enables two different users to sign the document. The first user must fill out and sign their designated fields, which are visible only to them. Once the first user has completed their section, the second user can be selected to fill out and sign their own fields. After both users have signed, the document can be finalized.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "More information on the PDF this.viewer instantiation can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started" }, "documentation section"),
                    "."))));
    };
    return ESigningPdfForms;
}(sample_base_1.SampleBase));
exports.ESigningPdfForms = ESigningPdfForms;
;
