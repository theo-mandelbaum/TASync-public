ej.base.enableRipple(window.ripple)

    var dropElement = document.getElementsByClassName('control-fluid')[0];
    var preloadFiles = [
        { name: 'Nature', size: 500000, type: '.png' },
        { name: 'TypeScript Succinctly', size: 12000, type: '.pdf' },
        { name: 'ASP.NET Webhooks', size: 500000, type: '.docx' }
    ];
    //Initialize the control by preload files
    var uploadObj = new ej.inputs.Uploader({
        asyncSettings: {
            saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
            removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
        },
        files: preloadFiles,
        removing: onFileRemove,
        dropArea: dropElement
    });
    uploadObj.appendTo('#fileupload');
    function onFileRemove(args) {
        args.postRawFile = false;
    }
    document.getElementById('clearbtn').onclick = function () {
        uploadObj.clearAll();
    };  
