import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import './uploader.css';
import { PropertyPane } from '../common/property-pane';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { useEffect, useRef, useState } from 'react';
const Default = () => {
    // Uploader component
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [isAutoUpload, setIsAutoUpload] = useState(true);
    const [isSequentialUpload, setIsSequentialUpload] = useState(false);
    let uploadObj = useRef(null);
    let asyncSettings;
    let dropContainerRef;
    let dropContainerEle = null;
    dropContainerEle = null;
    dropContainerRef = element => {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'http://localhost:62728/api/FileUploader/Save',
        removeUrl: 'http://localhost:62728/api/FileUploader/Remove'
    };
    const rendereComplete = () => {
        uploadObj.current.dropArea = dropContainerEle;
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        uploadObj.current.dataBind();
    };
    const onChange = (args) => {
        setIsAutoUpload(args.checked);
        uploadObj.current.clearAll();
    };
    const onChanged = (args) => {
        setIsSequentialUpload(args.checked);
        uploadObj.current.clearAll();
    };
    const onRemoveFile = (args) => {
        args.postRawFile = false;
    };
    return (<div className='control-pane' ref={dropContainerRef}>
            <div className='control-section row uploadpreview'>
            <div className='col-lg-9'>
            <div className='upload_wrapper'>
                {/* Render Uploader */}
                <UploaderComponent id='fileUpload' type='file' ref={uploadObj} asyncSettings={asyncSettings} removing={onRemoveFile.bind(this)} autoUpload={isAutoUpload} sequentialUpload={isSequentialUpload}></UploaderComponent>
            </div>
            </div>
            <div className='property-section col-lg-3' id="uploader">
                <PropertyPane title='Properties'>
                    <div className='panel-style'>
                        <CheckBoxComponent checked={true} label='Auto Upload' change={onChange.bind(this)}></CheckBoxComponent>
                    </div>
                    <div className='panel-style'>
                        <CheckBoxComponent checked={false} label='Sequential Upload' change={onChanged.bind(this)}></CheckBoxComponent>
                    </div>
                </PropertyPane>
            </div>
            </div>
            <div id="action-description">
                <p>
                    This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates the default functionalities of the file upload component with auto upload and sequential upload options.
                    Browse or drag-and-drop the files which you want to upload to the server and upload it.
                </p>
            </div>
            <div id="description">
                <p>The Uploader component is useful to upload images, documents, and other files. By default, the component allows to upload multiple files to browse and upload it to server. The selected files append to the file list that contains file details such as name, type, and size.</p>
                <p>You can manage the files in server after received the uploaded files. When the files are successfully uploaded to server, the remove button will be change to bin button. The uploaded files can be removed by click on the bin button.</p>
                <p>The progress bar displays for each file upload to denote its upload progress. Once the file upload gets success, the progress bar disappear and corresponding upload status message will be displayed in same place.</p>
                <p>More information on the Uploader instantiation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/getting-started/">documentation section</a>.</p>
            </div>
        </div>);
};
export default Default;
