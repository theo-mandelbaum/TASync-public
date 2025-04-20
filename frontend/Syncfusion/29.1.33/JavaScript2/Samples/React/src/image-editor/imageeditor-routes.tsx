import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import ProfilePicture from './profile-picture-functional';
import CustomToolbar from './custom-toolbar-functional';
import FileRestrict from './file-restrict-functional';


export const imageeditorRoutes = (
    <>
         <Route  path='/:theme/image-editor/default' Component={ Default }/>
         <Route  path='/:theme/image-editor/profile-picture' Component={ ProfilePicture }/>
         <Route  path='/:theme/image-editor/custom-toolbar' Component={ CustomToolbar }/>
         <Route  path='/:theme/image-editor/file-restrict' Component={ FileRestrict }/>

    </>
)

export const imageeditorCategory = {"default":{"name":"Default Functionalities","category":"Image Editor"},"profile-picture":{"name":"Profile Picture","category":"Image Editor"},"custom-toolbar":{"name":"Custom Toolbar","category":"Image Editor"},"file-restrict":{"name":"File Restriction","category":"Image Editor"},"defaultSample":"image-editor/default"}