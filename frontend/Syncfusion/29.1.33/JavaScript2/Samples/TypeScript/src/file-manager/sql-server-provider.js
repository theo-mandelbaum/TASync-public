define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-filemanager"], function (require, exports, culture_loader_1, ej2_filemanager_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_filemanager_1.FileManager.Inject(ej2_filemanager_1.Toolbar, ej2_filemanager_1.NavigationPane, ej2_filemanager_1.DetailsView, ej2_filemanager_1.ContextMenu);
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var hostUrl = 'https://ng2jq.syncfusion.com/ej2-sql-service/';
        var fileObject = new ej2_filemanager_1.FileManager({
            ajaxSettings: {
                url: hostUrl + 'api/FileManager/Fileoperations',
                getImageUrl: hostUrl + 'api/FileManager/GetImage',
                uploadUrl: hostUrl + 'api/FileManager/Upload',
                downloadUrl: hostUrl + 'api/FileManager/Download'
            },
            toolbarSettings: { items: ['NewFolder', 'SortBy', 'Cut', 'Copy', 'Paste', 'Delete', 'Refresh', 'Download', 'Rename', 'Selection', 'View', 'Details'] },
            contextMenuSettings: {
                file: ["Cut", "Copy", "|", "Delete", "Download", "Rename", "|", "Details"],
                layout: ["SortBy", "View", "Refresh", "|", "Paste", "|", "NewFolder", "|", "Details", "|", "SelectAll"],
                visible: true
            }
        });
        fileObject.appendTo('#filemanager');
    };
});
