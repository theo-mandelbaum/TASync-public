import * as React from 'react';
import { useEffect } from "react";
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';
/**
 * File Manager sample with NodeJs service
 */
const NodeJSServer = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let hostUrl = "https://ej2-nodejs-service.azurewebsites.net/";
    return (<div>
            <div className="control-section">
                <FileManagerComponent id="filemanager" ajaxSettings={{ url: hostUrl, getImageUrl: hostUrl + 'GetImage', uploadUrl: hostUrl + 'Upload', downloadUrl: hostUrl + 'Download' }} toolbarSettings={{ items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] }} contextMenuSettings={{ file: ['Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }}>
                    <Inject services={[NavigationPane, DetailsView, Toolbar, ContextMenu]}/>
                </FileManagerComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates how to utilize the <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem">NodeJS file system provider</a> with the File Manager component. It supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more. The <code>ej2-filemanager-node-filesystem</code> is an NPM package for file system provider which is available in npmjs, refer to this <a target="_blank" href="https://www.npmjs.com/package/@syncfusion/ej2-filemanager-node-filesystem">link</a> to download package.</p>
            </div>
            <div id="description">
                <p>Check out the project from this <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem">link</a>. Open the root folder and run the command <code>npm install</code> to install the necessary packages.</p>
                <p>After installing the packages, set the root folder directory of the file system in the <code>package.json</code> file under the <code>scripts</code> section, like this: <code> "start": "node filesystem-server.js -d D:/Files" </code>.</p>
                <p>Set the port on which the project will be hosted and the root directory of the file system. For example: <code>set PORT=3000 && node filesystem-server.js -d D:/Files</code>. </p>
                <p>Finally, map the <a href="https://ej2.syncfusion.com/javascript/documentation/api/file-manager/#ajaxsettings" target="_blank"> ajaxSettings </a> property to the appropriate file operation methods in the <code>filesystem-server.js</code> file. This will allow users to manage the physical file system using the NodeJS file system provider.</p>
                <p><b>Note: </b>File Manager’s upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download <a target="_blank" href="https://github.com/SyncfusionExamples/ej2-filemanager-node-filesystem">NodeJS File Provider</a> from the GitHub repository.</p>
            </div>
        </div>);
};
export default NodeJSServer;
