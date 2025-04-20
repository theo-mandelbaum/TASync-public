import * as React from 'react';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { UploaderComponent } from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-popups';
import { detach, createElement, EventHandler, Browser } from '@syncfusion/ej2-base';
import './custom-file-list.css';
import { useEffect, useRef } from 'react';
const CustomTemplate = () => {
    // Uploader component
    useEffect(() => {
        updateSampleSection();
        renderComplete();
    }, []);
    let uploadObj = useRef(null);
    let parentElement;
    let progressbarContainer;
    let filesDetails = [];
    let filesList = [];
    let dropElement;
    let asyncSettings;
    let dropRef;
    let dropContainerRef;
    let dropContainerEle;
    let buttonRef;
    let dropAreaEle;
    let btnRef;
    dropAreaEle = null;
    dropContainerEle = null;
    dropRef = element => {
        dropAreaEle = element;
    };
    buttonRef = (element) => {
        btnRef = element;
    };
    dropContainerRef = element => {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'http://localhost:62728/api/FileUploader/Save',
        removeUrl: 'http://localhost:62728/api/FileUploader/Remove'
    };
    const onSuccess = (args) => {
        let spinnerElement = dropAreaEle;
        let li = dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        if (args.operation === 'upload') {
            li.querySelector('.close-icon-container').classList.add('delete-icon');
            detach(li.getElementsByTagName('progress')[0]);
            li.querySelector('.file-size').style.display = 'inline-block';
            li.querySelector('.file-name').style.color = 'green';
            li.querySelector('.e-icons').onclick = () => {
                createSpinner({ target: spinnerElement, width: '25px' });
                showSpinner(spinnerElement);
            };
            li.querySelector('.close-icon-container').onkeydown = (e) => {
                if (e.keyCode === 13) {
                    createSpinner({ target: spinnerElement, width: '25px' });
                    showSpinner(spinnerElement);
                }
            };
        }
        else {
            filesDetails.splice(filesList.indexOf(li), 1);
            filesList.splice(filesList.indexOf(li), 1);
            uploadObj.current.element.value = '';
            detach(li);
            hideSpinner(spinnerElement);
            detach(spinnerElement.querySelector('.e-spinner-pane'));
        }
        EventHandler.add(li.querySelector('.close-icon-container'), 'click', removeFiles, this);
    };
    const onFileSelect = (args) => {
        if (dropAreaEle.lastChild.className !== 'upload-list-root') {
            parentElement = createElement('div', { className: 'upload-list-root' });
            parentElement.appendChild(createElement('ul', { className: 'ul-element' }));
            dropAreaEle.appendChild(parentElement);
        }
        for (let i = 0; i < args.filesData.length; i++) {
            formSelectedData(args.filesData[i], this); // create the LI element for each file Data
        }
        filesDetails = filesDetails.concat(args.filesData);
        uploadObj.current.upload(args.filesData, true);
        args.cancel = true;
    };
    const formSelectedData = (selectedFiles, proxy) => {
        let liEle = createElement('li', { className: 'file-lists', attrs: { 'data-file-name': selectedFiles.name } });
        liEle.appendChild(createElement('span', { className: 'file-name ', innerHTML: selectedFiles.name }));
        liEle.appendChild(createElement('span', { className: 'file-size ', innerHTML: uploadObj.current.bytesToSize(selectedFiles.size) }));
        if (selectedFiles.statusCode === '1') {
            progressbarContainer = createElement('span', { className: 'progress-bar-container' });
            progressbarContainer.appendChild(createElement('progress', { className: 'progress', attrs: { value: '0', max: '100' } }));
            liEle.appendChild(progressbarContainer);
        }
        else {
            liEle.querySelector('.file-name').classList.add('upload-fails');
        }
        let closeIconContainer = createElement('span', { className: 'e-icons close-icon-container' });
        EventHandler.add(closeIconContainer, 'click', removeFiles, proxy);
        liEle.appendChild(closeIconContainer);
        dropAreaEle.querySelector(".ul-element").appendChild(liEle);
        filesList.push(liEle);
    };
    const onFileUpload = (args) => {
        let li = dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        EventHandler.remove(li.querySelector('.close-icon-container'), 'click', removeFiles);
        let progressValue = Math.round((args.e.loaded / args.e.total) * 100);
        if (!isNaN(progressValue)) {
            li.getElementsByTagName('progress')[0].value = progressValue; // Updating the progress bar value
        }
    };
    const onUploadFailed = (args) => {
        let li = dropAreaEle.querySelector('[data-file-name="' + args.file.name + '"]');
        EventHandler.add(li.querySelector('.close-icon-container'), 'click', removeFiles, this);
        li.querySelector('.file-name ').classList.add('upload-fails');
        if (args.operation === 'upload') {
            detach(li.querySelector('.progress-bar-container'));
        }
    };
    const removeFiles = (args) => {
        let status = filesDetails[filesList.indexOf(args.currentTarget.parentElement)].statusCode;
        if (status === '2') {
            uploadObj.current.remove(filesDetails[filesList.indexOf(args.currentTarget.parentElement)]);
        }
        else {
            detach(args.currentTarget.parentElement);
        }
    };
    const onRemoveFile = (args) => {
        args.postRawFile = false;
    };
    const renderComplete = () => {
        dropAreaEle.children[0].children[0].onclick = () => {
            dropAreaEle.children[1].children[0].querySelector('button').click();
            return false;
        };
        dropElement = dropContainerEle;
        btnRef.onclick = () => {
            if (!dropAreaEle.lastChild) {
                return;
            }
            detach(dropAreaEle.lastChild);
            filesList = [];
            filesDetails = [];
        };
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        uploadObj.current.dropArea = dropElement;
        uploadObj.current.dataBind();
        if (Browser.isDevice) {
            uploadObj.current.dropArea.querySelector('drop').style.padding = '4% 13%';
        }
    };
    return (<div className='control-pane' ref={dropContainerRef}>
			<div className='control-section uploadpreview'>
                <div className='col-lg-9'>
                    <div className='template_wrapper'>
                        {/* Render Uploader */}
                        <div id='dropArea' className='dropArea' ref={dropRef}>
                            <span id='drop' className='file-name-span drop'> Drop files here or <a href="" id='browse'><u>Browse</u></a> </span>
                            <UploaderComponent id='fileUpload' type='file' ref={uploadObj} asyncSettings={asyncSettings} success={onSuccess.bind(this)} removing={onRemoveFile.bind(this)} selected={onFileSelect.bind(this)} progress={onFileUpload.bind(this)} failure={onUploadFailed.bind(this)} dropArea={dropElement}></UploaderComponent>
                        </div>
                    </div>
				</div>
				<div className='property-section template-panel col-lg-3'>
					<PropertyPane title='Properties'>
						<div className='custom-panel'>
							<button className="e-btn e-css" ref={buttonRef} id="clearbtn" title="Clear All">Clear All</button>
						</div>
					</PropertyPane>
				</div>
			</div>
			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload" target="_blank">&nbsp;React File Upload</a> example demonstrates how to customize the file list with template. Browse or select the files to view the file list template.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to customize its file list using template property. The template used for each file in file list.</p>
				<p>For more information, you can refer to the Template section from this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/uploader/template/#custom-template">documentation section</a>.</p>
			</div>
		</div>);
};
export default CustomTemplate;
