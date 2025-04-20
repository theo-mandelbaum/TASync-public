import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import ReadOnly from './read-only-functional';
import DocumentList from './document-list-functional';
import MultiFormatViewer from './multi-format-viewer-functional';
import OrganizePages from './organize-pages-functional';
import Redaction from './redaction-functional';
import CustomToolbar from './custom-toolbar-functional';
import CustomContextMenu from './custom-context-menu-functional';
import RightToLeft from './right-to-left-functional';
import FormFilling from './form-filling-functional';
import FormDesignerComponent from './form-designer-functional';
import ESignFormDesigner from './esigning-form-designer-functional';
import ESigningPdfForms from './esigning-pdf-forms-functional';
import Annotations from './annotations-functional';
import ProgrammaticOperations from './programmatic-operations-functional';
import HandWrittenSignature from './hand-written-functional';
import InvisibleSignature from './invisible-signature-functional';
export const pdfviewerRoutes = (<>
         <Route path='/:theme/pdfviewer/default' Component={Default}/>
         <Route path='/:theme/pdfviewer/read-only' Component={ReadOnly}/>
         <Route path='/:theme/pdfviewer/document-list' Component={DocumentList}/>
         <Route path='/:theme/pdfviewer/multi-format-viewer' Component={MultiFormatViewer}/>
         <Route path='/:theme/pdfviewer/organize-pages' Component={OrganizePages}/>
         <Route path='/:theme/pdfviewer/redaction' Component={Redaction}/>
         <Route path='/:theme/pdfviewer/custom-toolbar' Component={CustomToolbar}/>
         <Route path='/:theme/pdfviewer/custom-context-menu' Component={CustomContextMenu}/>
         <Route path='/:theme/pdfviewer/right-to-left' Component={RightToLeft}/>
         <Route path='/:theme/pdfviewer/form-filling' Component={FormFilling}/>
         <Route path='/:theme/pdfviewer/form-designer' Component={FormDesignerComponent}/>
         <Route path='/:theme/pdfviewer/esigning-form-designer' Component={ESignFormDesigner}/>
         <Route path='/:theme/pdfviewer/esigning-pdf-forms' Component={ESigningPdfForms}/>
         <Route path='/:theme/pdfviewer/annotations' Component={Annotations}/>
         <Route path='/:theme/pdfviewer/programmatic-operations' Component={ProgrammaticOperations}/>
         <Route path='/:theme/pdfviewer/hand-written' Component={HandWrittenSignature}/>
         <Route path='/:theme/pdfviewer/invisible-signature' Component={InvisibleSignature}/>

    </>);
export const pdfviewerCategory = { "default": { "name": "Default Functionalities", "category": "PDF Viewer" }, "read-only": { "name": "Read-Only", "category": "Document Security" }, "document-list": { "name": "Document List", "category": "File Management" }, "multi-format-viewer": { "name": " Multi-Format Viewer", "category": "File Management" }, "organize-pages": { "name": "Organize Pages", "category": "Editor" }, "redaction": { "name": "Redaction", "category": "Editor" }, "custom-toolbar": { "name": "Toolbar", "category": "Customization" }, "custom-context-menu": { "name": "Context Menu", "category": "Customization" }, "right-to-left": { "name": "Right To Left", "category": "Localization" }, "form-filling": { "name": "Form Filling", "category": "PDF Form" }, "form-designer": { "name": "Form Designer", "category": "PDF Form" }, "esigning-form-designer": { "name": "eSigning Form Designer", "category": "PDF Form" }, "esigning-pdf-forms": { "name": "eSigning PDF Forms", "category": "PDF Form" }, "annotations": { "name": "Annotations", "category": "Annotation" }, "programmatic-operations": { "name": "Programmatic Operations", "category": "Annotation" }, "hand-written": { "name": "Handwritten Signature", "category": "Signature" }, "invisible-signature": { "name": "Invisible Signature", "category": "Signature" }, "defaultSample": "pdfviewer/default" };
