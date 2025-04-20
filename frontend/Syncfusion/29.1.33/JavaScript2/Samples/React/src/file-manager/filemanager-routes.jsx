import { Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './overview-functional';
import FlatData from './flat-data-functional';
import CustomThumbnail from './custom-thumbnail-functional';
import Default from './default-functional';
import DragAndDrop from './drag-drop-functional';
import DirectoryUpload from './directory-upload-functional';
import VirtualizationSample from './virtualization-functional';
import FileUpload from './file-upload-functional';
import AccessControl from './access-control-functional';
import Azure from './azure-service-functional';
import NodeJSServer from './nodejs-file-provider-functional';
import AmazonS3Provider from './AmazonS3Provider-functional';
import Firebase from './firebase-functional';
import IBMServer from './ibm-cos-node-file-provider-functional';
export const filemanagerRoutes = (<>
         <Route path='/:theme/file-manager/overview' Component={Overview}/>
         <Route path='/:theme/file-manager/flat-data' Component={FlatData}/>
         <Route path='/:theme/file-manager/custom-thumbnail' Component={CustomThumbnail}/>
         <Route path='/:theme/file-manager/default' Component={Default}/>
         <Route path='/:theme/file-manager/drag-drop' Component={DragAndDrop}/>
         <Route path='/:theme/file-manager/directory-upload' Component={DirectoryUpload}/>
         <Route path='/:theme/file-manager/virtualization' Component={VirtualizationSample}/>
         <Route path='/:theme/file-manager/file-upload' Component={FileUpload}/>
         <Route path='/:theme/file-manager/access-control' Component={AccessControl}/>
         <Route path='/:theme/file-manager/azure-service' Component={Azure}/>
         <Route path='/:theme/file-manager/nodejs-file-provider' Component={NodeJSServer}/>
         <Route path='/:theme/file-manager/AmazonS3Provider' Component={AmazonS3Provider}/>
         <Route path='/:theme/file-manager/firebase' Component={Firebase}/>
         <Route path='/:theme/file-manager/ibm-cos-node-file-provider' Component={IBMServer}/>

    </>);
export const filemanagerCategory = { "overview": { "name": "Overview", "category": "File Manager" }, "flat-data": { "name": "Flat Data", "category": "File Manager" }, "custom-thumbnail": { "name": "Custom Thumbnails", "category": "File Manager" }, "default": { "name": "API", "category": "File Manager" }, "drag-drop": { "name": "Drag and Drop", "category": "File Manager" }, "directory-upload": { "name": "Directory upload", "category": "File Manager" }, "virtualization": { "name": "Virtualization", "category": "File Manager" }, "file-upload": { "name": "File Upload", "category": "Use Case" }, "access-control": { "name": "Access Control", "category": "Use Case" }, "azure-service": { "name": "Azure Blob Provider", "category": "Cloud Service Providers" }, "nodejs-file-provider": { "name": "NodeJS File Provider", "category": "Cloud Service Providers" }, "AmazonS3Provider": { "name": "Amazon S3 File Provider", "category": "Cloud Service Providers" }, "firebase": { "name": "Firebase Realtime File Provider", "category": "Cloud Service Providers" }, "ibm-cos-node-file-provider": { "name": "IBM Cloud File Provider", "category": "Cloud Service Providers" }, "defaultSample": "file-manager/overview" };
