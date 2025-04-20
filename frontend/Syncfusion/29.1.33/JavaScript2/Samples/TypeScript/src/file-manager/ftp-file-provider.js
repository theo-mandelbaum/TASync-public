define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-filemanager"], function (require, exports, culture_loader_1, ej2_filemanager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_filemanager_1.FileManager.Inject(ej2_filemanager_1.Toolbar, ej2_filemanager_1.NavigationPane, ej2_filemanager_1.DetailsView, ej2_filemanager_1.ContextMenu);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var hostUrl = 'https://ej2-ftp-aspcore-service.azurewebsites.net/';
        var fileObject = new ej2_filemanager_1.FileManager({
            ajaxSettings: {
                url: hostUrl + 'api/FTPProvider/FTPFileOperations',
                getImageUrl: hostUrl + 'api/FTPProvider/FTPGetImage',
                uploadUrl: hostUrl + 'api/FTPProvider/FTPUpload',
                downloadUrl: hostUrl + 'api/FTPProvider/FTPDownload'
            },
            toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
            contextMenuSettings: {
                file: ["Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
                layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
                visible: true
            }
        });
        fileObject.appendTo('#ftpFilemanager');
    };
});
