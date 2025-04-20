/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner, PageOrganizer,Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';

export class HandWrittenSignature extends SampleBase<{}, {}> {
  public viewer: PdfViewerComponent;
  public isInitialLoading: boolean =  true;
  render() {
    return (<div>
      <div className='control-section'>
        <div className="flex-container">
          <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
          <div className="e-message render-mode-info">
            <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
          </div>
          <SwitchComponent cssClass="buttonSwitch" id="checked" change={this.change} checked={true}></SwitchComponent>
        </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { this.viewer = scope; }} id="container" documentPath="https://cdn.syncfusion.com/content/pdf/handwritten-signature.pdf" resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" documentLoad = {this.documentLoaded} style={{ 'height': '640px' }}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]} />
            </PdfViewerComponent>
          </div>
        <div id="action-description">
        <p>This sample demonstrates the Handwritten signature and initial support of the PDF Viewer. The signature or initial support reduces the paperwork of reviewing the contents and it is verified digitally.</p>
        </div>
        <div id="description">
        <p>
        In the PDF Viewer component, we can explicitly open the Handwritten signature dialog or initial dialog using the method setAnnotationMode.
        </p>
        <p>
        More information on the PDF Viewer instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/pdfviewer/getting-started">
        documentation section
        </a>.
        </p>
        </div>
        </div>
    );
  }
  documentLoaded = () => {
    if (this.isInitialLoading) {
      this.viewer.annotationModule.setAnnotationMode('HandWrittenSignature');
      this.isInitialLoading = false;
    }
  }
  change = (args) => {
    if (args.checked) {
      this.viewer.serviceUrl = '';
    }
    else {
      this.viewer.serviceUrl = 'https://ej2services.syncfusion.com/production/web-services/api/pdfviewer';
    }
    this.viewer.dataBind();
    this.viewer.load(this.viewer.documentPath, null);
  }
}