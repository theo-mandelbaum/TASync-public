import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';
export class FormFilling extends SampleBase {
    viewer;
    render() {
        return (<div>
        <div className='control-section'>
            <div className="flex-container">
                <label htmlFor="checked" className="switchLabel"> Standalone PDF Viewer </label>
                <div className="e-message render-mode-info">
                    <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                </div>
                <SwitchComponent cssClass="buttonSwitch" id="checked" change={this.change} checked={true}></SwitchComponent>
            </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent id="container" ref={(scope) => { this.viewer = scope; }} documentPath="https://cdn.syncfusion.com/content/pdf/form-filling-document.pdf" resourceUrl="https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" validateFormFields={this.validateFormFields} enableFormFieldsValidation={true} showNotificationDialog={false} style={{ 'height': '640px' }}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer]}/>
            </PdfViewerComponent>
          </div>
        <div id="action-description">
        <p>This sample demonstrates the form filling features of PDF Viewer and allows you to edit the form fields, download and print the edited form fields PDF documents.</p>
        </div>
 
        <div id="description">
        <p>
        The PDF Viewer component enables you to view and print the PDF files. This sample demonstrate the following key features of PDF Viewer,
        </p>
        <ul>
        <li>View the PDF document</li>
        <li>Core interactions - Scrolling, Zooming, panning and page navigation</li>
        <li>Built-in toolbar</li>
        <li>Select and copy text from PDF file</li>
        <li>Search a text easily across the PDF document</li>
        <li>Easy navigation with the help of Bookmarks, thumbnails, hyperlinks and table of contents</li>
        <li>View modes - fit to page and fit to width</li>
        <li>Print the entire document or a specific page directly from the browser.</li>
        </ul>
        <p>
        More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
        documentation section
        </a>.
        </p>
        </div>
        </div>);
    }
    validateFormFields = (args) => {
        var errorMessage = "Required Field(s): ";
        var forms = this.viewer.formFieldCollections;
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
            this.viewer.showNotificationPopup(errorMessage);
        }
    };
    change = (args) => {
        if (args.checked) {
            this.viewer.serviceUrl = '';
        }
        else {
            this.viewer.serviceUrl = 'http://localhost:62728/api/pdfviewer';
        }
        this.viewer.dataBind();
        this.viewer.load(this.viewer.documentPath, null);
    };
}
