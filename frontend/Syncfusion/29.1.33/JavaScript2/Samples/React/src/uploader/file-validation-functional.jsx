import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import './uploader.css';
import { useEffect, useRef } from 'react';
const Validation = () => {
    // Uploader component
    useEffect(() => {
        updateSampleSection();
    }, []);
    let uploadObj = useRef(null);
    let asyncSettings;
    let allowedExtensions;
    let dropContainerRef;
    let dropContainerEle;
    dropContainerEle = null;
    dropContainerRef = element => {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'http://localhost:62728/api/FileUploader/Save',
        removeUrl: 'http://localhost:62728/api/FileUploader/Remove'
    };
    allowedExtensions = '.doc, .docx, .xls, .xlsx';
    const rendereComplete = () => {
        uploadObj.current.dropArea = dropContainerEle;
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        uploadObj.current.dataBind();
    };
    const onFileSelected = (args) => {
        args.filesData.splice(5);
        let filesData = uploadObj.current.getFilesData();
        let allFiles = filesData.concat(args.filesData);
        if (allFiles.length > 5) {
            for (let i = 0; i < allFiles.length; i++) {
                if (allFiles.length > 5) {
                    allFiles.shift();
                }
            }
            args.filesData = allFiles;
            args.modifiedFilesData = args.filesData;
        }
        args.isModified = true;
    };
    const onRemoveFile = (args) => {
        args.postRawFile = false;
    };
    return (<div className='control-pane' ref={dropContainerRef}>
			<div className='control-section col-lg-12 uploadpreview'>
				<div className='upload_wrapper'>
					<UploaderComponent id='validation' type='file' ref={uploadObj} asyncSettings={asyncSettings} selected={onFileSelected.bind(this)} minFileSize={10000} autoUpload={false} removing={onRemoveFile.bind(this)} allowedExtensions={allowedExtensions}></UploaderComponent>
				</div>
			</div>
			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates how to validate the files before uploading it to server. Only document files (DOC, DOCX, XLS, XLSX), and the files should contain minimum 10 KB and maximum 28 MB sizes to upload it into server.This sample limits maximum files count as 5 to upload.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to validate the file’s type, and limit the file size using allowedExtensions, minFileSize, and maxFileSize properties. You can also achieve limit the files count before uploading it using select event. </p> 
				<p>For more information, you can refer to the Validation section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/validation/">documentation section</a>.</p>
			</div>
      	</div>);
};
export default Validation;
