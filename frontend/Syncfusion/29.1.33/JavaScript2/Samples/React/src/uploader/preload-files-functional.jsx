import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import './uploader.css';
import { PropertyPane } from '../common/property-pane';
import { UploaderComponent, FilesDirective, UploadedFilesDirective } from '@syncfusion/ej2-react-inputs';
import { useEffect, useRef } from 'react';
const Preloadfiles = () => {
    // Uploader component
    useEffect(() => {
        updateSampleSection();
    }, []);
    let uploadObj = useRef(null);
    let dropElement;
    let asyncSettings;
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
    const rendereComplete = () => {
        dropElement = dropContainerEle;
        uploadObj.current.dropArea = dropElement;
        uploadObj.current.dataBind();
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
    };
    const onRemoveFile = (args) => {
        args.postRawFile = false;
    };
    const clearButtonClick = () => {
        uploadObj.current.clearAll();
    };
    return (<div className='control-pane' ref={dropContainerRef}>
			<div className='control-section uploadpreview'>
				<div className='col-lg-9'>
					<div className='validation_wrapper'>
						<UploaderComponent id='validation' type='file' ref={uploadObj} asyncSettings={asyncSettings} removing={onRemoveFile.bind(this)}>
							<FilesDirective>
								<UploadedFilesDirective name="Nature" size={25000} type=".png"></UploadedFilesDirective>
								<UploadedFilesDirective name="TypeScript succinctly" size={12000} type=".pdf"></UploadedFilesDirective>
								<UploadedFilesDirective name="ASP.NET" size={17000} type=".docx"></UploadedFilesDirective>
							</FilesDirective>
						</UploaderComponent>
					</div>
				</div>
				<div className='property-section preload-panel col-lg-3'>
					<PropertyPane title='Properties'>
						<div className='panel-style'>
							<button className="e-btn e-css" onClick={clearButtonClick.bind(this)} id="clearbtn" title="Clear All">Clear All</button>
						</div>
					</PropertyPane>
				</div>
			</div>
			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server. Also, you can achieve state persistence on page refresh.</p>	
				<p>For more information, you can refer to the Preload Files section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/async/#preload-files">documentation section</a>.</p>
				<p>To achieve state persistence, you can refer to this How-to section.</p>
			</div>
      	</div>);
};
export default Preloadfiles;
