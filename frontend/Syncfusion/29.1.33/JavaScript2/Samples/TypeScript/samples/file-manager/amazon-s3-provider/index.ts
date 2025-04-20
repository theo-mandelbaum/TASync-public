import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager sample with Amazon S3 service
 */

    
    let hostUrl: string = 'https://amazons3.azurewebsites.net/api/AmazonS3Provider/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'AmazonS3FileOperations',
            getImageUrl: hostUrl + 'AmazonS3GetImage',
            uploadUrl: hostUrl + 'AmazonS3Upload',
            downloadUrl: hostUrl + 'AmazonS3Download'
        },
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
        contextMenuSettings: {
            file: [ "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
            layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
            visible: true
        },
        searchSettings: {allowSearchOnTyping: false}
    });
    fileObject.appendTo('#filemanager');
