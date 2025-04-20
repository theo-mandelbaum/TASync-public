import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { updateSampleSection } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
function ESigningPdfForms() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let viewer = React.useRef(null);
    let userMenu = React.useRef(null);
    let dialogInstance = React.useRef(null);
    let btnElement = React.useRef(null);
    let currentUser = React.useRef('andrew@mycompany.com');
    let status = React.useRef(false);
    let preventChange = React.useRef(false);
    let borderColor = React.useRef('1px solid red');
    let finishedBackground = React.useRef('#daeaf7ff');
    let opacityValue = React.useRef('0.5');
    let anneBackground = React.useRef('#eff7ef');
    let andrewBackground = React.useRef('#ffefef');
    let buttons = [
        {
            click: dlgButtonClick,
            buttonModel: {
                content: 'OK',
                isPrimary: true,
            }
        }
    ];
    let userDetails = [
        { Name: 'Andrew Fuller', Eimg: 'profile1', Mail: 'andrew@mycompany.com', fieldIds: [] },
        { Name: 'Anne Dodsworth', Eimg: 'profile2', Mail: 'anne@mycompany.com', fieldIds: [] },
    ];
    const fields = { text: 'Mail', value: 'Eimg', fieldIds: 'fieldIds' };
    const dropdownComponent = () => {
        return (<div id='e-pv-e-sign-user-field' style={{ width: '245px', height: '37px', left: '0px' }}>
                <div className='e-pv-e-sign-user-dropdown'>
                    <DropDownListComponent ref={userMenu} id='userMenu' select={userChange} index={0} popupWidth={'215px'} dataSource={userDetails} width={'200px'} fields={fields} itemTemplate={itemTemplate} valueTemplate={valueTemplate}></DropDownListComponent>
                </div>
            </div>);
    };
    const itemTemplate = (data) => {
        return (<div style={{ display: 'flex' }}>
                <img className="e-pv-e-sign-empImage" style={{ maxHeight: '35px', marginTop: '7px', marginLeft: '4px', borderRadius: '50%', border: `1px solid ${data.Mail === 'andrew@mycompany.com' ? 'red' : 'green'}` }} src={'src/pdfviewer/images/employees/' + data['Eimg'] + '.png'}/>
                <div>
                    <div className="e-pv-e-sign-ename" style={{ height: '18px', fontSize: '14px' }}> {data.Name} </div>
                    <div className="e-pv-e-sign-job" style={{ fontSize: '12px' }}> {data.Mail} </div>
                </div>
            </div>);
    };
    const valueTemplate = (data) => {
        return (<div className="e-pv-e-sign-valueTemplate" style={{ display: 'flex' }}>
            <img className="e-pv-e-sign-value" style={{ borderRadius: '20px', border: borderColor.current, marginLeft: '3px', }} src={'src/pdfviewer/images/employees/' + data['Eimg'] + '.png'} height="30px" width="30px" alt="employee"/>
            <div>
                <div className="e-pv-e-sign-name" style={{ fontSize: '12px', marginLeft: '12px', alignContent: 'center' }}> {data.Name} </div>
                <div className="e-pv-e-sign-job" style={{ fontSize: '10px', marginLeft: '11px', alignContent: 'center' }}> {data.Mail} </div>
            </div>
        </div>);
    };
    const buttonComponent = () => {
        return (<ButtonComponent ref={btnElement} id='e-pv-e-sign-finishbtn' cssClass="e-outline" onClick={finishSigning} created={btnCreated}>Finish Signing</ButtonComponent>);
    };
    const btnCreated = () => {
        btnElement.current.disabled = true;
    };
    const finishSigning = () => {
        for (const formField of viewer.current.formFieldCollections) {
            viewer.current?.formDesignerModule.updateFormField(formField, { backgroundColor: finishedBackground.current });
        }
        const url = "http://localhost:62728/api/pdfviewer/FlattenDownload";
        viewer.current.saveAsBlob().then((blob) => {
            return convertBlobToBase64(blob);
        }).then((base64String) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            const requestData = JSON.stringify({ base64String });
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const responseBase64 = xhr.responseText.split('base64,')[1];
                    if (responseBase64) {
                        const blob = createBlobFromBase64(responseBase64, 'application/pdf');
                        const blobUrl = URL.createObjectURL(blob);
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
            xhr.onerror = () => {
                console.error('An error occurred during the download:', xhr.statusText);
            };
            xhr.send(requestData);
        }).catch((error) => {
            console.error('Error saving Blob:', error);
        });
    };
    const convertBlobToBase64 = (blob) => {
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
    const createBlobFromBase64 = (base64String, contentType) => {
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
    const downloadDocument = (blobUrl) => {
        const anchorElement = document.createElement('a');
        anchorElement.href = blobUrl;
        anchorElement.target = '_parent';
        const downloadFileName = viewer.current.fileName || 'default.pdf';
        anchorElement.download = downloadFileName.endsWith('.pdf')
            ? downloadFileName
            : `${downloadFileName.split('.pdf')[0]}.pdf`;
        document.body.appendChild(anchorElement);
        anchorElement.click();
        document.body.removeChild(anchorElement);
        URL.revokeObjectURL(blobUrl);
    };
    const updateUserFormField = () => {
        var otherFormFieldDetails = viewer.current.formFieldCollections.filter(formField => formField.customData.author === "anne");
        var currentFormFieldDetails = viewer.current.formFieldCollections.filter(formField => formField.customData.author === "andrew");
        if (currentUser.current === 'andrew@mycompany.com') {
            otherFormFieldDetails.forEach(field => {
                if (field.value !== '') {
                    const mainFieldUpdateData = {
                        backgroundColor: finishedBackground.current,
                        isReadOnly: true
                    };
                    viewer.current.formDesigner.updateFormField(field, mainFieldUpdateData);
                    currentFormFieldDetails.forEach(currentField => {
                        const currentFieldUpdateData = {
                            backgroundColor: andrewBackground.current,
                            isReadOnly: true
                        };
                        viewer.current.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                    });
                }
                else {
                    currentFormFieldDetails.forEach(currentField => {
                        const currentFieldUpdateData = {
                            backgroundColor: andrewBackground.current,
                        };
                        viewer.current.formDesigner.updateFormField(currentField, currentFieldUpdateData);
                    });
                }
                const otherUserField = document.getElementById(field.id + '_content_html_element');
                if (otherUserField) {
                    const currentFormField = viewer.current.formFieldCollections.find(formField => formField.id === field.id);
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
                currentFormFieldDetails.forEach(field => {
                    const currentFieldUpdateData = {
                        backgroundColor: finishedBackground.current,
                        isReadOnly: true
                    };
                    viewer.current.formDesigner.updateFormField(field, currentFieldUpdateData);
                    otherFormFieldDetails.forEach(otherField => {
                        const otherFieldUpdateData = {
                            backgroundColor: anneBackground.current,
                            isReadOnly: false
                        };
                        viewer.current.formDesigner.updateFormField(otherField, otherFieldUpdateData);
                    });
                });
                otherFormFieldDetails.forEach(field => {
                    viewer.current.formDesignerModule.updateFormField(field, { visibility: 'visible' });
                });
            }
        }
    };
    function dlgButtonClick() {
        status.current = false;
        dialogInstance.current.hide();
    }
    const validation = (args) => {
        var forms = args;
        var isAllFieldFilled = true;
        let errorMessage = "Required Field(s): ";
        let flag = false;
        let radioGroupName = "";
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
    const fieldChange = (args) => {
        var errorMessage = "Required Field(s): ";
        var forms = viewer.current.formFieldCollections;
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
            btnElement.current.disabled = false;
        }
        else {
            btnElement.current.disabled = true;
        }
    };
    const userChange = (args) => {
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
    const documentLoad = () => {
        viewer.current.designerMode = false;
        updateUserFormField();
    };
    return (<div>
        <div>
            <div className='e-pv-e-sign control-section'>
                <ToolbarComponent id="e-pv-e-sign-toolbar-user-viewer">
                    <ItemsDirective>
                        <ItemDirective template={dropdownComponent}></ItemDirective>
                        <ItemDirective align='Right' template={buttonComponent}></ItemDirective>
                    </ItemsDirective>
                </ToolbarComponent>
                <PdfViewerComponent ref={viewer} id="container" enableNavigationToolbar={false} enableAnnotationToolbar={false} enableToolbar={false} enableFormDesignerToolbar={false} documentPath="https://cdn.syncfusion.com/content/pdf/eSign_filling.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/27.2.2/dist/ej2-pdfviewer-lib" zoomMode="FitToPage" downloadFileName='eSign_filling.pdf' documentLoad={documentLoad} formFieldPropertiesChange={fieldChange} style={{ 'height': '640px' }}>
                    <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]}/>
                </PdfViewerComponent>
                <div id='e-pv-e-sign-dialog-target'>
                    <DialogComponent ref={dialogInstance} minHeight='50px' isModal={true} width='350px' buttons={buttons} visible={status.current} target='#e-pv-e-sign-dialog-target'></DialogComponent>
                </div>
            </div>
        </div>
        <div id="action-description">
            <p>This sample enables two different users to sign the document. The first user must fill out and sign their designated fields, which are visible only to them. Once the first user has completed their section, the second user can be selected to fill out and sign their own fields. After both users have signed, the document can be finalized.</p>
        </div>
        <div id="description">
            <p>
                More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
                    documentation section
                </a>.
            </p>
        </div>
    </div>);
}
export default ESigningPdfForms;
