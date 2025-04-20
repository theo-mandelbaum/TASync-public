import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import BindUIToDocument from './bindUI-to-document-functional';
import DocumentList from './document-list-functional';
import MailMerge from './mail-merge-functional';
import Comments from './comments-functional';
import TrackChanges from './track-changes-functional';
import DocumentProtection from './document-protection-functional';
import CustomContextMenuView from './custom-context-menu-functional';
import DocumentEditorAutoSave from './auto-save-functional';
import ToolbarCustomization from './toolbar-customization-functional';
import ColorPickerCustomization from './colorpicker-customization-functional';
import RightToLeftView from './right-to-left-functional';
import PrintView from './print-functional';
import AdvancedExportingView from './advanced-exporting-functional';
import TableOfContentsView from './table-of-contents-functional';
import Notes from './notes-functional';
import AutoShapesComponent from './autoshapes-functional';
import WebLayout from './web-layout-functional';
import Ruler from './ruler-functional';
import HeadingNavigation from './heading-navigation-functional';
import CharacterFormatView from './character-formatting-functional';
import ParagraphFormatView from './paragraph-formatting-functional';
import StylesView from './styles-functional';
import BulletsAndNumberingView from './bullets-and-numbering-functional';
import HyperlinksAndBookmarksView from './links-and-bookmarks-functional';
import TableFormatView from './table-formatting-functional';
import SectionFormatView from './section-formatting-functional';
import HeadersAndFootersView from './headers-and-footers-functional';
import FormFields from './form-fields-functional';
import MultipleColumnsView from './multiple-columns-functional';
import DocumentEditorChart from './chart-functional';


export const documenteditorRoutes = (
    <>
         <Route  path='/:theme/document-editor/default' Component={ Default }/>
         <Route  path='/:theme/document-editor/bindUI-to-document' Component={ BindUIToDocument }/>
         <Route  path='/:theme/document-editor/document-list' Component={ DocumentList }/>
         <Route  path='/:theme/document-editor/mail-merge' Component={ MailMerge }/>
         <Route  path='/:theme/document-editor/comments' Component={ Comments }/>
         <Route  path='/:theme/document-editor/track-changes' Component={ TrackChanges }/>
         <Route  path='/:theme/document-editor/document-protection' Component={ DocumentProtection }/>
         <Route  path='/:theme/document-editor/custom-context-menu' Component={ CustomContextMenuView }/>
         <Route  path='/:theme/document-editor/auto-save' Component={ DocumentEditorAutoSave }/>
         <Route  path='/:theme/document-editor/toolbar-customization' Component={ ToolbarCustomization }/>
         <Route  path='/:theme/document-editor/colorpicker-customization' Component={ ColorPickerCustomization }/>
         <Route  path='/:theme/document-editor/right-to-left' Component={ RightToLeftView }/>
         <Route  path='/:theme/document-editor/print' Component={ PrintView }/>
         <Route  path='/:theme/document-editor/advanced-exporting' Component={ AdvancedExportingView }/>
         <Route  path='/:theme/document-editor/table-of-contents' Component={ TableOfContentsView }/>
         <Route  path='/:theme/document-editor/notes' Component={ Notes }/>
         <Route  path='/:theme/document-editor/autoshapes' Component={ AutoShapesComponent }/>
         <Route  path='/:theme/document-editor/web-layout' Component={ WebLayout }/>
         <Route  path='/:theme/document-editor/ruler' Component={ Ruler }/>
         <Route  path='/:theme/document-editor/heading-navigation' Component={ HeadingNavigation }/>
         <Route  path='/:theme/document-editor/character-formatting' Component={ CharacterFormatView }/>
         <Route  path='/:theme/document-editor/paragraph-formatting' Component={ ParagraphFormatView }/>
         <Route  path='/:theme/document-editor/styles' Component={ StylesView }/>
         <Route  path='/:theme/document-editor/bullets-and-numbering' Component={ BulletsAndNumberingView }/>
         <Route  path='/:theme/document-editor/links-and-bookmarks' Component={ HyperlinksAndBookmarksView }/>
         <Route  path='/:theme/document-editor/table-formatting' Component={ TableFormatView }/>
         <Route  path='/:theme/document-editor/section-formatting' Component={ SectionFormatView }/>
         <Route  path='/:theme/document-editor/headers-and-footers' Component={ HeadersAndFootersView }/>
         <Route  path='/:theme/document-editor/form-fields' Component={ FormFields }/>
         <Route  path='/:theme/document-editor/multiple-columns' Component={ MultipleColumnsView }/>
         <Route  path='/:theme/document-editor/chart' Component={ DocumentEditorChart }/>

    </>
)

export const documenteditorCategory = {"default":{"name":"Default Functionalities","category":"Document Editor"},"bindUI-to-document":{"name":"Bind UI To Document","category":"Document Editor"},"document-list":{"name":"Document List","category":"File Management"},"mail-merge":{"name":"Mail Merge","category":"Mail Merge"},"comments":{"name":"Comments","category":"Review"},"track-changes":{"name":"Track Changes","category":"Review"},"document-protection":{"name":"Document Protection","category":"Security"},"custom-context-menu":{"name":"Custom Context Menu","category":"Customization"},"auto-save":{"name":"Auto Save","category":"Customization"},"toolbar-customization":{"name":"Toolbar Customization","category":"Customization"},"colorpicker-customization":{"name":"Color Picker Customization","category":"Customization"},"right-to-left":{"name":"Right To Left","category":"RTL"},"print":{"name":"Print","category":"Exporting"},"advanced-exporting":{"name":"Advanced Exporting","category":"Exporting"},"table-of-contents":{"name":"Table of Contents","category":"References"},"notes":{"name":"Footnotes and Endnotes","category":"References"},"autoshapes":{"name":"Auto Shapes","category":"Shapes"},"web-layout":{"name":"Web Layout","category":"View"},"ruler":{"name":"Ruler","category":"View"},"heading-navigation":{"name":"Heading Navigation","category":"View"},"character-formatting":{"name":"Character Formatting","category":"Editing Features"},"paragraph-formatting":{"name":"Paragraph Formatting","category":"Editing Features"},"styles":{"name":"Styles","category":"Editing Features"},"bullets-and-numbering":{"name":"Bullets and Numbering","category":"Editing Features"},"links-and-bookmarks":{"name":"Hyperlinks and Bookmarks","category":"Editing Features"},"table-formatting":{"name":"Table Formatting","category":"Editing Features"},"section-formatting":{"name":"Section Formatting","category":"Editing Features"},"headers-and-footers":{"name":"Headers and Footers","category":"Editing Features"},"form-fields":{"name":"Form Fields","category":"Editing Features"},"multiple-columns":{"name":"Multiple Columns","category":"Editing Features"},"chart":{"name":"Chart Preservation","category":"Charts"},"defaultSample":"document-editor/default"}