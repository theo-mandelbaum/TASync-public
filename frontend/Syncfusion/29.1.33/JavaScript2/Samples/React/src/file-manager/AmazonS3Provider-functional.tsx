import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { useEffect } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { FileManagerComponent, Inject, NavigationPane, DetailsView, Toolbar, ContextMenu } from '@syncfusion/ej2-react-filemanager';

/**
 * File Manager sample with Amazon S3 file provider service
 */
const AmazonS3Provider = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let hostUrl: string = "https://amazons3.azurewebsites.net/api/AmazonS3Provider/";
    return(
        <div>
            <div className="control-section">
                <FileManagerComponent id="filemanager" ajaxSettings = {{url: hostUrl +'AmazonS3FileOperations',getImageUrl: hostUrl + 'AmazonS3GetImage',uploadUrl: hostUrl + 'AmazonS3Upload',downloadUrl: hostUrl + 'AmazonS3Download'}} searchSettings={{allowSearchOnTyping: false}} toolbarSettings={{items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details']}} contextMenuSettings={{file: [ 'Cut', 'Copy', '|', 'Delete', 'Download', 'Rename', '|', 'Details'], layout: ['SortBy', 'View', 'Refresh', '|', 'Paste', '|', 'NewFolder', '|', 'Details', '|', 'SelectAll'], visible: true }}>
                    <Inject services={[ NavigationPane, DetailsView, Toolbar, ContextMenu]} />
                </FileManagerComponent>
            </div>
            <div id="action-description">
            <p>This sample demonstrates how to use the <a target="_blank" href="https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider">Amazon S3 file system provider</a> with the File Manager control to perform file operations. It supports all basic file operations such as create, rename, delete, cut, copy, paste, upload, download, and more.</p>
            </div>
            <div id="description">
                <p>This sample explains the Amazon S3 (Simple Storage Service) cloud file provider that allows users to access and manage a server-hosted file system as a collection of objects stored in the Amazon S3 Bucket. To start the service,create an <a target="_blank" href="https://docs.aws.amazon.com/AmazonS3/latest/userguide/GetStartedWithS3.html">Amazon S3 account</a> and a bucket, and then provide your Amazon S3 client account details such as the <code>bucket name</code>, <code>AWS access key ID</code>, <code>AWS secret key ID</code>, and <code>AWS region</code> in the <code>RegisterAmazonS3</code> method to perform file operations.</p>
                <p>Checkout this <a target="_blank" href="https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider">Amazon S3 file system provider</a> from the GitHub repository to connect with the <code>RegisterAmazonS3</code> method.</p>
                <p><b>Note: </b>File Manager’s upload functionality is restricted in online demos for security reasons. To work with upload functionality, please download the <a target="_blank" href="https://github.com/SyncfusionExamples/amazon-s3-aspcore-file-provider">Amazon S3 File Provider</a> from the GitHub repository.</p>
            </div>
        </div>
    );
}
export default AmazonS3Provider;