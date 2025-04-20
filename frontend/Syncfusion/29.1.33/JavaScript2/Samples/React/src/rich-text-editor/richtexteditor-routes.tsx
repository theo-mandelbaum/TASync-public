import {  Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './tools-functional';
import Default from './rich-text-editor-functional';
import ImageSample from './image-functional';
import InsertMedia from './insert-media-functional';
import Inline from './inline-functional';
import PasteCleanupRTE from './paste-cleanup-functional';
import FormatPainterRTE from './format-painter-functional';
import IFrame from './iframe-functional';
import Print from './print-functional';
import AjaxContent from './ajax-load-functional';
import ResizableEditor from './resize-editor-functional';
import RTEApi from './api-functional';
import EnterKeyConfiguration from './enter-key-configuration-functional';
import RTEEvents from './client-side-events-functional';
import Forums from './blog-posting-functional';
import AutoSave from './auto-save-functional';
import FileBrowser from './file-browser-functional';
import InsertEmoticons from './insert-emoticons-functional';
import OnlineHtmlEditor from './online-html-editor-functional';
import ImageEditorIntegration from './image-editor-integration-functional';
import MailMerge from './mail-merge-functional';
import ExportDocument from './export-document-functional';
import ImportWord from './import-word-functional';
import MentionIntegration from './mention-integration-functional';
import SmartSuggestion from './smart-suggestion-functional';
import Type from './types-functional';
import QuickFormatToolbar from './quick-format-toolbar-functional';
import InsertSpecialCharacters from './insert-special-characters-functional';


export const richtexteditorRoutes = (
    <>
         <Route  path='/:theme/rich-text-editor/tools' Component={ Overview }/>
         <Route  path='/:theme/rich-text-editor/rich-text-editor' Component={ Default }/>
         <Route  path='/:theme/rich-text-editor/image' Component={ ImageSample }/>
         <Route  path='/:theme/rich-text-editor/insert-media' Component={ InsertMedia }/>
         <Route  path='/:theme/rich-text-editor/inline' Component={ Inline }/>
         <Route  path='/:theme/rich-text-editor/paste-cleanup' Component={ PasteCleanupRTE }/>
         <Route  path='/:theme/rich-text-editor/format-painter' Component={ FormatPainterRTE }/>
         <Route  path='/:theme/rich-text-editor/iframe' Component={ IFrame }/>
         <Route  path='/:theme/rich-text-editor/print' Component={ Print }/>
         <Route  path='/:theme/rich-text-editor/ajax-load' Component={ AjaxContent }/>
         <Route  path='/:theme/rich-text-editor/resize-editor' Component={ ResizableEditor }/>
         <Route  path='/:theme/rich-text-editor/api' Component={ RTEApi }/>
         <Route  path='/:theme/rich-text-editor/enter-key-configuration' Component={ EnterKeyConfiguration }/>
         <Route  path='/:theme/rich-text-editor/client-side-events' Component={ RTEEvents }/>
         <Route  path='/:theme/rich-text-editor/blog-posting' Component={ Forums }/>
         <Route  path='/:theme/rich-text-editor/auto-save' Component={ AutoSave }/>
         <Route  path='/:theme/rich-text-editor/file-browser' Component={ FileBrowser }/>
         <Route  path='/:theme/rich-text-editor/insert-emoticons' Component={ InsertEmoticons }/>
         <Route  path='/:theme/rich-text-editor/online-html-editor' Component={ OnlineHtmlEditor }/>
         <Route  path='/:theme/rich-text-editor/image-editor-integration' Component={ ImageEditorIntegration }/>
         <Route  path='/:theme/rich-text-editor/mail-merge' Component={ MailMerge }/>
         <Route  path='/:theme/rich-text-editor/export-document' Component={ ExportDocument }/>
         <Route  path='/:theme/rich-text-editor/import-word' Component={ ImportWord }/>
         <Route  path='/:theme/rich-text-editor/mention-integration' Component={ MentionIntegration }/>
         <Route  path='/:theme/rich-text-editor/smart-suggestion' Component={ SmartSuggestion }/>
         <Route  path='/:theme/rich-text-editor/types' Component={ Type }/>
         <Route  path='/:theme/rich-text-editor/quick-format-toolbar' Component={ QuickFormatToolbar }/>
         <Route  path='/:theme/rich-text-editor/insert-special-characters' Component={ InsertSpecialCharacters }/>

    </>
)

export const richtexteditorCategory = {"tools":{"name":"Overview","category":"Rich Text Editor"},"rich-text-editor":{"name":"Default Functionalities","category":"Rich Text Editor"},"image":{"name":"Image","category":"Rich Text Editor"},"insert-media":{"name":"Insert Media","category":"Rich Text Editor"},"inline":{"name":"Inline","category":"Rich Text Editor"},"paste-cleanup":{"name":"Paste from MS Word","category":"Rich Text Editor"},"format-painter":{"name":"Format Painter","category":"Rich Text Editor"},"iframe":{"name":"IFrame","category":"Rich Text Editor"},"print":{"name":"Print","category":"Rich Text Editor"},"ajax-load":{"name":"Ajax Content","category":"Rich Text Editor"},"resize-editor":{"name":"Resizable Editor","category":"Rich Text Editor"},"api":{"name":"API","category":"Rich Text Editor"},"enter-key-configuration":{"name":"Enter Key Configuration","category":"Rich Text Editor"},"client-side-events":{"name":"Events","category":"Rich Text Editor"},"blog-posting":{"name":"Use Case","category":"Rich Text Editor"},"auto-save":{"name":"Auto Save","category":"Rich Text Editor"},"file-browser":{"name":"File Browser","category":"Rich Text Editor"},"insert-emoticons":{"name":"Insert Emoticons","category":"Rich Text Editor"},"online-html-editor":{"name":"Online Html Editor","category":"Rich Text Editor"},"image-editor-integration":{"name":"Image Editor Integration","category":"Rich Text Editor"},"mail-merge":{"name":"Mail Merge","category":"Rich Text Editor"},"export-document":{"name":"Export to Word / PDF","category":"Export / Import"},"import-word":{"name":"Import from Word","category":"Export / Import"},"mention-integration":{"name":"@ Mention","category":"Mention Integration"},"smart-suggestion":{"name":"Smart Suggestion","category":"Mention Integration"},"types":{"name":"Type","category":"Toolbar"},"quick-format-toolbar":{"name":"Quick Format Toolbar","category":"Toolbar"},"insert-special-characters":{"name":"Insert Special Characters","category":"Custom Tool"},"defaultSample":"rich-text-editor/tools"}