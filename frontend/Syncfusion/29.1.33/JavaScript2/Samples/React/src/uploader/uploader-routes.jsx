import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import ChunkUpload from './chunk-upload-functional';
import CustomTemplate from './custom-file-list-functional';
import Preloadfiles from './preload-files-functional';
import Validation from './file-validation-functional';
import Preview from './image-preview-functional';
import Formsupport from './file-upload-with-forms-functional';
import Customdroparea from './custom-drop-area-functional';
export const uploaderRoutes = (<>
         <Route path='/:theme/uploader/default' Component={Default}/>
         <Route path='/:theme/uploader/chunk-upload' Component={ChunkUpload}/>
         <Route path='/:theme/uploader/custom-file-list' Component={CustomTemplate}/>
         <Route path='/:theme/uploader/preload-files' Component={Preloadfiles}/>
         <Route path='/:theme/uploader/file-validation' Component={Validation}/>
         <Route path='/:theme/uploader/image-preview' Component={Preview}/>
         <Route path='/:theme/uploader/file-upload-with-forms' Component={Formsupport}/>
         <Route path='/:theme/uploader/custom-drop-area' Component={Customdroparea}/>

    </>);
export const uploaderCategory = { "default": { "name": "Default Functionalities", "category": "File Upload" }, "chunk-upload": { "name": "Chunk Upload", "category": "File Upload" }, "custom-file-list": { "name": "Template", "category": "File Upload" }, "preload-files": { "name": "Preload files", "category": "File Upload" }, "file-validation": { "name": "File Validation", "category": "File Upload" }, "image-preview": { "name": "Image Preview", "category": "File Upload" }, "file-upload-with-forms": { "name": "Form Support", "category": "File Upload" }, "custom-drop-area": { "name": "Custom Drop Area", "category": "File Upload" }, "defaultSample": "uploader/default" };
