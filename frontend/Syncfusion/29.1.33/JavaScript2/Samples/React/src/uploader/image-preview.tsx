import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import {PropertyPane} from '../common/property-pane';
import {UploaderComponent, Uploader, SelectedEventArgs, FileInfo, RemovingEventArgs} from '@syncfusion/ej2-react-inputs';
import { createSpinner, showSpinner, hideSpinner } from '@syncfusion/ej2-react-popups';
import { EmitType, detach, Browser, createElement, isNullOrUndefined, EventHandler } from '@syncfusion/ej2-base';
import './image-preview.css';

export class Preview extends SampleBase<{}, {}> {
// Uploader component
public filesDetails : FileInfo[] = [];
public dropElement: HTMLElement;
public filesList: HTMLElement[] = [];
public filesName: string[] = [];
public uploadWrapper: HTMLElement;
public parentElement: HTMLElement;
public uploadObj: UploaderComponent;
private asyncSettings: object ;
private allowedExtensions: string;
private dropArea: HTMLElement;
private dropContainerRef;
private dropContainerEle: HTMLElement;
private dropAreaRef;
private dropAreaEle: HTMLElement;
private dropImageRef;
private dropImageEle: HTMLElement;
constructor(props: {}) {
    super(props);
    this.dropAreaEle = null;
    this.dropContainerEle = null;
    this.dropImageEle =  null;
    this.dropContainerRef = element => {
        this.dropContainerEle = element;
    };
    this.dropAreaRef = element => {
        this.dropAreaEle = element;
    };
    this.dropImageRef = element => {
        this.dropImageEle = element;
    };
    this.asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    this.allowedExtensions= '.jpg,.png,.jpeg'
}

public rendereComplete(): void {
    this.dropArea = this.dropAreaEle;
    this.dropElement = this.dropContainerEle;
    if (Browser.isDevice) { this.dropImageEle.style.padding = '0px 10%'; }
    this.uploadObj.element.setAttribute('name', 'UploadFiles');
    document.getElementById('browse').onclick = () => {
        document.getElementsByClassName('e-file-select-wrap')[0].querySelector('button').click();
        return false;
    };
    document.getElementById('clearbtn').onclick = () => {
        if (!this.dropElement.querySelector('ul')) { return; }
        detach(this.dropElement.querySelector('ul'));
        this.filesList = [];
        this.filesDetails = [];
        this.filesName = [];
        this.uploadObj.element.value = '';
        if (this.dropArea.classList.contains('e-spinner-pane')) {
            hideSpinner(this.dropArea);
            detach(this.dropElement.querySelector('.e-spinner-pane'));
        }
    };
    document.getElementById('uploadbtn').onclick = () => {
        if (this.dropElement.querySelector('ul') && this.filesDetails.length > 0) {
            this.uploadObj.upload(this.filesDetails, true);
        }
    };
    this.uploadObj.dropArea = this.dropElement;
    this.uploadObj.dataBind();
}
private onSelect(args: SelectedEventArgs): void {
    if (!this.dropElement.querySelector('li')) { this.filesDetails = []; }
    if (isNullOrUndefined(this.dropArea.querySelector('.e-upload-files'))) {
        this.parentElement = createElement('ul', { className: 'e-upload-files' });
        document.getElementsByClassName('e-upload')[0].appendChild(this.parentElement);
    }
    let validFiles: FileInfo[] = this.validateFiles(args, this.filesDetails);
    if (validFiles.length === 0) {
        args.cancel = true;
        return;
    }
    for (let i : number = 0; i < validFiles.length; i++) {
        this.formSelectedData(validFiles[i], this);
    }
    this.filesDetails = this.filesDetails.concat(validFiles);
    args.cancel = true;
}

private validateFiles (args: any, viewedFiles: FileInfo[]): FileInfo[] {
    let modifiedFiles: FileInfo[] = [];
    let validFiles: FileInfo[] = [];
    let isModified: boolean = false;
    if (args.event.type === 'drop') {
        isModified = true;
        let allImages: string[] = ['png', 'jpg', 'jpeg'];
        let files: FileInfo[] = args.filesData;
        for (let file of files) {
            if (allImages.indexOf(file.type) !== -1) {
                modifiedFiles.push(file);
            }
        }
    }
    let files: FileInfo[] = modifiedFiles.length > 0 || isModified ? modifiedFiles : args.filesData;
    if (this.filesName.length > 0) {
        for (let file of files) {
            if (this.filesName.indexOf(file.name) === -1) {
                this.filesName.push(file.name);
                validFiles.push(file);
            }
        }
    } else {
        for (let file of files) {
            this.filesName.push(file.name);
            validFiles.push(file);
        }
    }
    return validFiles;
}

private formSelectedData (file : FileInfo, proxy: any): void {
    let liEle : HTMLElement = createElement('li',  {className: 'e-upload-file-list', attrs: {'data-file-name': file.name}});
    let imageTag: HTMLImageElement = createElement('IMG',  {className: 'upload-image', attrs: {'alt': 'Image'}}) as HTMLImageElement;
    let wrapper: HTMLElement = createElement('span', {className: 'wrapper'});
    wrapper.appendChild(imageTag); liEle.appendChild(wrapper);
    liEle.appendChild(createElement('div', {className: 'file-name', innerHTML: file.name, attrs: {'title': file.name}}));
    liEle.appendChild(createElement('div', {className: 'file-size', innerHTML: proxy.uploadObj.bytesToSize(file.size) }));
    let clearbtn: HTMLElement;
    let uploadbtn: HTMLElement;
    clearbtn = createElement('span', {id: 'removeIcon', className: 'e-icons e-file-remove-btn', attrs: {'title': 'Remove'}});
    EventHandler.add(clearbtn, 'click', this.removeFiles, proxy);
    liEle.setAttribute('title', 'Ready to Upload');
    uploadbtn = createElement('span', {className: 'e-upload-icon e-icons e-file-remove-btn', attrs: {'title': 'Upload'}});
    uploadbtn.setAttribute('id', 'iconUpload'); EventHandler.add(uploadbtn, 'click', this.uploadFile, proxy);
    let progressbarContainer: HTMLElement;
    progressbarContainer = createElement('progress', {className: 'progressbar', id: 'progressBar', attrs: {value: '0', max: '100'}});
    liEle.appendChild(clearbtn); liEle.appendChild(uploadbtn);
    liEle.appendChild(progressbarContainer);
    this.readURL(liEle, file); document.querySelector('.e-upload-files').appendChild(liEle);
    proxy.filesList.push(liEle);
}

private uploadFile(args: any): void {
    this.uploadObj.upload([this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)]], true);
}

private removeFiles(args: any): void {
    let removeFile: FileInfo = this.filesDetails[this.filesList.indexOf(args.currentTarget.parentElement)];
    let statusCode: string = removeFile.statusCode;
    if (statusCode === '2' || statusCode === '1') {
        this.uploadObj.remove(removeFile, true);
        this.uploadObj.element.value = '';
    }
    let index: number = this.filesList.indexOf(args.currentTarget.parentElement);
    this.filesList.splice(index, 1);
    this.filesDetails.splice(index, 1);
    this.filesName.splice(this.filesName.indexOf(removeFile.name), 1);
    if (statusCode !== '2') { detach(args.currentTarget.parentElement); }
}

private onFileUpload(args: any): void {
    let li : Element = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
    let iconEle: HTMLElement = li.querySelector('#iconUpload') as HTMLElement;
    iconEle.style.cursor = 'not-allowed';
    iconEle.classList.add('e-uploaded');
    EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
    let progressValue : number = Math.round((args.e.loaded / args.e.total) * 100);
    if (!isNaN(progressValue) && li.querySelector('.progressbar')) {
        li.getElementsByTagName('progress')[0].value = progressValue;
    }
}

private onUploadSuccess(args: any): void {
    let spinnerElement: HTMLElement = document.getElementById('dropArea');
    let li : HTMLElement = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
    if (li && !isNullOrUndefined(li.querySelector('.progressbar'))) {
        (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
    }
    if (args.operation === 'upload') {
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        (li.querySelector('.file-name') as HTMLElement).style.color = 'green';
        (li.querySelector('.e-icons') as HTMLElement).onclick = () => {
            this.generateSpinner(this.dropArea);
        };
    } else {
        detach(li);
        hideSpinner(spinnerElement); detach(spinnerElement.querySelector('.e-spinner-pane'));
    }
    if (!isNullOrUndefined(li)) {
        li.setAttribute('title', args.e.currentTarget.statusText);
    }
}

private generateSpinner(targetElement: HTMLElement): void {
    createSpinner({ target: targetElement, width: '25px' });
    showSpinner(targetElement);
}

private onUploadFailed(args : any): void {
    let li : Element = this.dropArea.querySelector('[data-file-name="' + args.file.name + '"]');
    (li.querySelector('.file-name') as HTMLElement).style.color = 'red';
    li.setAttribute('title', args.e.currentTarget.statusText)
    if (args.operation === 'upload') {
        EventHandler.remove(li.querySelector('#iconUpload'), 'click', this.uploadFile);
        (li.querySelector('.progressbar') as HTMLElement).style.visibility = 'hidden';
    }
}

private readURL(li: HTMLElement, args: any): void {
    let preview: HTMLImageElement = li.querySelector('.upload-image');
    let file: File = args.rawFile; let reader: FileReader = new FileReader();
    reader.addEventListener('load', () => { preview.src = reader.result as string; }, false);
    if (file) { reader.readAsDataURL(file); }
}
private onRemoveFile(args: RemovingEventArgs): void {
    args.postRawFile = false;
}

public render(): JSX.Element {
    return (
      <div className = 'control-pane' ref={this.dropContainerRef}>
			<div className='control-section' id='uploadpreview'>
				<div className= 'col-lg-9'>
					<div className='imagepreview'>
						<div id='dropArea' ref={this.dropAreaRef} className='dropTarget'>
							<span id='dropimage' ref={this.dropImageRef} className='file-name-drop'> Drop image (JPG, PNG) files here or <a href="" id='browse'><u>Browse</u></a> </span>
                            <UploaderComponent id='previewfileupload' type = 'file' ref={upload => this.uploadObj = upload}
                                asyncSettings={this.asyncSettings}
								success={ this.onUploadSuccess.bind(this) }
								selected= {this.onSelect.bind(this)}
                                removing= { this.onRemoveFile.bind(this)}
								progress= {this.onFileUpload.bind(this)}
                                failure= {this.onUploadFailed.bind(this)}
                                allowedExtensions={this.allowedExtensions}
							></UploaderComponent>
						</div>
					</div>
				</div>
				<div className='property-section uploader-panel col-lg-3'>
					<PropertyPane title='Properties'>
						<div className='panel-style'>
							<button className="e-btn e-css" id="clearbtn" title="Clear All">Clear All</button>
						</div>
						<div className='panel-style'>
							<button className="e-btn e-css" id="uploadbtn" title="Upload All">Upload All</button>
						</div>
					</PropertyPane>
				</div>
			</div>
			<div id="action-description">
				<p>This <a href="https://www.syncfusion.com/react-ui-components/react-file-upload"
            target="_blank">&nbsp;React File Upload</a> example demonstrates how to add an image preview of the uploaded files.
                    Browse or drag-and-drop image files (PNG, JPG) to display preview for the selected files.</p>
			</div>
			<div id="description">
				<p>The Uploader component allows to create preview images after uploaded it. The preview images created by reading the file using success event.  Also, the user can create preview images before uploading to server using select event.</p>
			</div>
      </div>
    );
  }
}
