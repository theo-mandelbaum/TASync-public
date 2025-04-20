import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { FileManager, Toolbar, NavigationPane, DetailsView, ContextMenu } from '@syncfusion/ej2-filemanager';

FileManager.Inject(Toolbar, NavigationPane, DetailsView, ContextMenu);

/**
 * File Manager sample with firebase realtime database service
 */

    
    let hostUrl: string = 'https://realtime-firebase.azurewebsites.net/';
    let fileObject: FileManager = new FileManager({
        ajaxSettings: {
            url: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeFileOperations',
            getImageUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeGetImage',
            uploadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeUpload',
            downloadUrl: hostUrl + 'api/FirebaseProvider/FirebaseRealtimeDownload'
        },
        toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
        contextMenuSettings: {
            file: [ "Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
            layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
            visible: true
        }
    });
    fileObject.appendTo('#filemanager');
