import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);


import { Uploader, FileInfo, SelectedEventArgs, RemovingEventArgs } from '@syncfusion/ej2-inputs';
/**
 * Uploader file size and files count validation sample
 */

    

    let dropElement: HTMLElement = document.getElementsByClassName('control-fluid')[0] as HTMLElement;

    // Initialize the control with file validation
    let uploadObj: Uploader = new Uploader({
        autoUpload: false,
        minFileSize: 10000,
        allowedExtensions: '.doc, .docx, .xls, .xlsx',
        asyncSettings: {
            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
        },
        selected: onFileSelected,
        removing: onFileRemove,
        dropArea: dropElement
    });
    uploadObj.appendTo('#validation');

    function onFileRemove(args: RemovingEventArgs) : void {
        args.postRawFile = false;
    }
    function onFileSelected(args : SelectedEventArgs) : void {
        // Filter the 5 files only to showcase
        args.filesData.splice(5);
        let filesData : FileInfo[] = uploadObj.getFilesData();
        let allFiles : FileInfo[] = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (let i : number = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            // set the modified custom data
            args.modifiedFilesData = args.filesData;
        }
        args.isModified = true;
    }
