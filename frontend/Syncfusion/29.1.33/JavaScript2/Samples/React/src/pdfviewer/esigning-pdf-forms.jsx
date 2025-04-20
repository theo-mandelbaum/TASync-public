import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import './pdf.component.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
export class ESigningPdfForms extends SampleBase {
    viewer;
    userMenu;
    dialogInstance;
    btnElement;
    currentUser = 'andrew@mycompany.com';
    status = false;
    preventChange = false;
    borderColor = '1px solid red';
    finishedBackground = '#daeaf7ff';
    opacityValue = '0.5';
    andrewBackground = '#eff7ef';
    anneBackground = '#ffefef';
    buttons = [
        {
            buttonModel: {
                content: 'OK',
                isPrimary: true,
            },
            'click': () => {
                this.status = false;
                this.dialogInstance.hide();
            }
        }
    ];
    userDetails = [
        { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
        { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
    ];
    fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };
    dropdownComponent = () => {
        return (<div id='e-pv-e-sign-user-field' style={{ width: '245px', height: '37px', left: '0px' }}>
                <div className='e-pv-e-sign-user-dropdown'>
                    <DropDownListComponent ref={(scope) => { this.userMenu = scope; }} id='this.userMenu' select={this.userChange} index={0} popupWidth={'215px'} dataSource={this.userDetails} width={'200px'} fields={this.fields} itemTemplate={this.itemTemplate} valueTemplate={this.valueTemplate}></DropDownListComponent>
                </div>
            </div>);
    };
    itemTemplate = (data) => {
        return (<div style={{ display: 'flex' }}>
                <img className="e-pv-e-sign-empImage" style={{ maxHeight: '35px', marginTop: '7px', marginLeft: '4px', borderRadius: '50%', border: `1px solid ${data.Mail === 'andrew@mycompany.com' ? 'red' : 'green'}` }} src={'src/pdfviewer/images/employees/' + data['Eimg'] + '.png'}/>
                <div>
                    <div className="e-pv-e-sign-ename" style={{ height: '18px', fontSize: '14px' }}> {data.Name} </div>
                    <div className="e-pv-e-sign-job" style={{ fontSize: '12px' }}> {data.Mail} </div>
                </div>
            </div>);
    };
    valueTemplate = (data) => {
        return (<div className="e-pv-e-sign valueTemplate" style={{ display: 'flex' }}>
            <img className="e-pv-e-sign-value" style={{ borderRadius: '20px', marginLeft: '3px', border: this.borderColor }} src={'src/pdfviewer/images/employees/' + data['Eimg'] + '.png'} height="30px" width="30px" alt="employee"/>
            <div>
                <div className="e-pv-e-sign-name" style={{ fontSize: '12px', marginLeft: '12px', alignContent: 'center' }}> {data.Name} </div>
                <div className="e-pv-e-sign-job" style={{ fontSize: '10px', marginLeft: '11px', alignContent: 'center' }}> {data.Mail} </div>
            </div>
        </div>);
    };
    buttonComponent = () => {
        return (<ButtonComponent ref={(scope) => { this.btnElement = scope; }} id='e-pv-e-sign-finishbtn' cssClass="e-outline" onClick={this.finishSigning} created={this.btnCreated}>Finish Signing</ButtonComponent>);
    };
    btnCreated = () => {
        this.btnElement.disabled = true;
    };
    finishSigning = (args) => {
        for (const formField of this.viewer.formFieldCollections) {
            this.viewer?.formDesignerModule.updateFormField(formField, { backgroundColor: this.finishedBackground });
        }
        const url = "http://localhost:62728/api/pdfviewer/FlattenDownload";
        this.viewer.saveAsBlob().then((blob) => {
            return this.convertBlobToBase64(blob);
        }).then((base64String) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            const requestData = JSON.stringify({ base64String });
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const responseBase64 = xhr.responseText.split('base64,')[1];
                    if (responseBase64) {
                        const blob = this.createBlobFromBase64(responseBase64, 'application/pdf');
                        const blobUrl = URL.createObjectURL(blob);
                        this.downloadDocument(blobUrl);
                        this.viewer.load(xhr.responseText, null);
                        this.btnElement.disabled = true;
                        this.userMenu.enabled = false;
                    }
                    else {
                        console.error('Invalid base64 response.');
                    }
                }
                else {
                    console.error('Download failed:', xhr.statusText);
                }
            };
            xhr.onerror = () => {
                console.error('An error occurred during the download:', xhr.statusText);
            };
            xhr.send(requestData);
        }).catch((error) => {
            console.error('Error saving Blob:', error);
        });
    };
    convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => {
                if (typeof reader.result === 'string') {
                    resolve(reader.result);
                }
                else {
                    reject(new Error('Failed to convert Blob to Base64'));
                }
            };
            reader.onerror = (error) => reject(error);
        });
    };
    createBlobFromBase64 = (base64String, contentType) => {
        const sliceSize = 512;
        const byteCharacters = atob(base64String);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    };
    downloadDocument = (blobUrl) => {
        const anchorElement = document.createElement('a');
        anchorElement.href = blobUrl;
        anchorElement.target = '_parent';
        const downloadFileName = this.viewer.fileName || 'default.pdf';
        anchorElement.download = downloadFileName.endsWith('.pdf')
            ? downloadFileName
            : `${downloadFileName.split('.pdf')[0]}.pdf`;
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
        URL.revokeObjectURL(blobUrl);
    };
    updateUserFormField = () => {
        var otherFormFieldDetails = this.viewer.formFieldCollections.filter(formField => formField.customData.author === "anne");
        var currentFormFieldDetails = this.viewer.formFieldCollections.filter(formField => formField.customData.author === "andrew");
        if (this.currentUser === 'andrew@mycompany.com') {
            otherFormFieldDetails.forEach(field => {
                if (field.value !== '') {
                    const mainFieldUpdateData = {
                        backgroundColor: this.finishedBackground,
                        isReadOnly: true
                    };
                    this.viewer.formDesigner.updateFormField(field, mainFieldUpdateData);
                    currentFormFieldDetails.forEach(currentField => {
                        const currentFieldUpdateData = {
                            backgroundColor: this.andrewBackground,
                            isReadOnly: true
                        };
                        this.viewer.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                    });
                }
                else {
                    currentFormFieldDetails.forEach(currentField => {
                        const currentFieldUpdateData = {
                            backgroundColor: this.andrewBackground,
                        };
                        this.viewer.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                    });
                }
                const otherUserField = document.getElementById(field.id + '_content_html_element');
                if (otherUserField) {
                    const currentFormField = this.viewer.formFieldCollections.find(formField => formField.id === field.id);
                    if (currentFormField.type !== 'DropDown' && otherUserField) {
                        if (!currentFormField.value) {
                            this.viewer.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' });
                        }
                    }
                    else {
                        if (currentFormField.value.length !== 0 && otherUserField) {
                            this.viewer.formDesignerModule.updateFormField(currentFormField, { visibility: 'hidden' });
                        }
                    }
                }
            });
        }
        else {
            this.validation(currentFormFieldDetails);
            if (!this.status) {
                currentFormFieldDetails.forEach(field => {
                    const currentFieldUpdateData = {
                        backgroundColor: this.finishedBackground,
                        isReadOnly: true
                    };
                    this.viewer.formDesigner.updateFormField(field, currentFieldUpdateData);
                    otherFormFieldDetails.forEach(otherField => {
                        const otherFieldUpdateData = {
                            backgroundColor: this.anneBackground,
                            isReadOnly: false
                        };
                        this.viewer.formDesigner.updateFormField(otherField, otherFieldUpdateData);
                    });
                });
                otherFormFieldDetails.forEach(field => {
                    this.viewer.formDesignerModule.updateFormField(field, { visibility: 'visible' });
                });
            }
        }
    };
    validation = (args) => {
        var errorMessage = "Required Field(s): ";
        var forms = args;
        var flag = false;
        var radioGroupName = "";
        for (let i = 0; i < forms.length; i++) {
            let text = "";
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
            this.status = true;
            this.dialogInstance.content = errorMessage;
            this.dialogInstance.show();
            this.preventChange = true;
        }
        else {
            this.status = false;
            this.preventChange = false;
        }
    };
    fieldChange = (args) => {
        var errorMessage = "Required Field(s): ";
        var forms = this.viewer.formFieldCollections;
        var flag = false;
        var isAllFieldFilled = true;
        var radioGroupName = "";
        forms.forEach(form => {
            let text = "";
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
            this.btnElement.disabled = false;
        }
        else {
            this.btnElement.disabled = true;
        }
    };
    userChange = (args) => {
        this.currentUser = args.itemData.Mail;
        if (args.itemData.Mail == "andrew@mycompany.com") {
            this.borderColor = '1px solid red';
        }
        else {
            this.borderColor = '1px solid green';
        }
        this.updateUserFormField();
        if (this.preventChange) {
            args.cancel = true;
        }
    };
    documentLoad = () => {
        this.viewer.designerMode = false;
        this.updateUserFormField();
    };
    render() {
        return (<div>
            <div>
                <div className='e-pv-e-sign control-section'>
                    <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer">
                        <ItemsDirective>
                            <ItemDirective template={this.dropdownComponent}></ItemDirective>
                            <ItemDirective align='Right' template={this.buttonComponent}></ItemDirective>
                        </ItemsDirective>
                    </ToolbarComponent>
                    <PdfViewerComponent ref={(scope) => { this.viewer = scope; }} id="container" enableNavigationToolbar={false} enableAnnotationToolbar={false} enableToolbar={false} enableFormDesignerToolbar={false} documentPath="https://cdn.syncfusion.com/content/pdf/eSign_filling.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib" zoomMode="FitToPage" downloadFileName='eSign_filling.pdf' documentLoad={this.documentLoad} formFieldPropertiesChange={this.fieldChange} style={{ 'height': '640px' }}>
                        <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]}/>
                    </PdfViewerComponent>
                    <div id='e-pv-e-sign-dialog-target'>
                        <DialogComponent ref={(scope) => { this.dialogInstance = scope; }} minHeight='50px' isModal={true} width='350px' buttons={this.buttons} visible={this.status} target='#e-pv-e-sign-dialog-target'></DialogComponent>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample enables two different users to sign the document. The first user must fill out and sign their designated fields, which are visible only to them. Once the first user has completed their section, the second user can be selected to fill out and sign their own fields. After both users have signed, the document can be finalized.</p>
            </div>
            <div id="description">                
                <p>
                    More information on the PDF this.viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                        documentation section
                    </a>.
                </p>
            </div>
        </div>);
    }
}
;
