import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager sample with Azure service
 */

    
    let hostUrl: string = 'https://ej2-azure-aspcore-service.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/AzureFileManager/AzureFileOperations',
            getImageUrl: hostUrl + 'api/AzureFileManager/AzureGetImage',
            uploadUrl: hostUrl + 'api/AzureFileManager/AzureUpload',
            downloadUrl: hostUrl + 'api/AzureFileManager/AzureDownload'
        },
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
        contextMenuSettings: {
            file: [ "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
            layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
            visible: true
        }
    });
    fileObject.appendTo('#filemanager');
