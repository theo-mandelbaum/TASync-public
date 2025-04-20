/**
 * Default PDF Viewer sample
 */
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PdfViewerComponent, Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView,
ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer, Inject } from '@syncfusion/ej2-react-pdfviewer';
import { SampleBase } from '../common/sample-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import './pdf.component.css';

export class Default extends SampleBase<{}, {}> {
  public viewer: PdfViewerComponent;
  render() {
    return ( <div>
        <div className='control-section'>
        <div className="flex-container">
                <label htmlFor="checked" className="switchLabel" > Standalone PDF Viewer </label>
                <div className="e-message render-mode-info">
                    <span className="e-msg-icon render-mode-info-icon" title="Turn OFF to render the PDF Viewer as server-backed"></span>
                </div>
                <SwitchComponent cssClass="buttonSwitch" id="checked" change={this.change} checked={true}></SwitchComponent>
            </div>
            {/* Render the PDF Viewer */}
            <PdfViewerComponent ref={(scope) => { this.viewer = scope; }}  id="container" documentPath="https://cdn.syncfusion.com/content/pdf/pdf-succinctly.pdf" resourceUrl = "https://cdn.syncfusion.com/ej2/23.2.6/dist/ej2-pdfviewer-lib" style={{ 'height': '640px' }}>
                <Inject services={[Toolbar, Magnification, Navigation, LinkAnnotation, BookmarkView, ThumbnailView, Print, TextSelection, TextSearch, Annotation, FormFields, FormDesigner,PageOrganizer]} />
            </PdfViewerComponent>
          </div>
        <div id="action-description">
        <p>This sample demonstrate the core features of PDF Viewer such as PDF viewing, printing, navigation, text search and selection, zooming, panning etc. with its built-in toolbar.</p>
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
        </div>
        );
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
