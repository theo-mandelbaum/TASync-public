import * as React from 'react';
import { createElement } from '@syncfusion/ej2-base';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { SampleBase } from '../common/sample-base';
import './profile-picture.css';
export class ProfilePicture extends SampleBase {
    animationSettings = { effect: 'None' };
    dialogInstance;
    imageEditorInstance;
    buttonEle;
    buttonRef;
    image;
    imgSrc = '';
    fileChanged(args) {
        const URL = window.URL;
        const url = URL.createObjectURL(args.target.files[0]);
        this.imageEditorInstance.open(url.toString());
        document.getElementById('img-upload').value = null;
        this.imgSrc = url.toString();
    }
    handleImageLoaded() {
        if (this.imgSrc === '') {
            let canvas = document.querySelector('#img-canvas');
            let image = document.querySelector('#custom-img');
            let ctx = canvas.getContext('2d');
            canvas.width = image.width < image.height ? image.width : image.height;
            canvas.height = canvas.width;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            document.querySelector('.e-profile').classList.remove('e-hide');
        }
    }
    buttons = [
        {
            click: this.dlgOpenButtonClick.bind(this),
            buttonModel: {
                content: 'Open',
                cssClass: 'e-custom-img-btn e-img-custom-open'
            }
        },
        {
            click: this.dlgResetButtonClick.bind(this),
            buttonModel: {
                content: 'Reset',
                cssClass: 'e-custom-img-btn e-img-custom-reset'
            }
        },
        {
            click: this.dlgRotateButtonClick.bind(this),
            buttonModel: {
                content: 'Rotate',
                cssClass: 'e-custom-img-btn e-img-custom-rotate'
            }
        },
        {
            click: this.dlgDoneButtonClick.bind(this),
            buttonModel: {
                content: 'Apply',
                cssClass: 'e-custom-img-btn e-img-custom-apply',
                isPrimary: true
            }
        }
    ];
    dlgOpenButtonClick() {
        document.getElementById('img-upload').click();
    }
    dlgResetButtonClick() {
        this.imageEditorInstance.reset();
    }
    dlgRotateButtonClick() {
        this.imageEditorInstance.rotate(-90);
    }
    dlgDoneButtonClick() {
        this.imageEditorInstance.crop();
        let croppedData = this.imageEditorInstance.getImageData();
        let canvas = document.querySelector('#img-canvas');
        let ctx = canvas.getContext('2d');
        let parentDiv = document.querySelector('.e-profile');
        let tempCanvas = parentDiv.appendChild(createElement('canvas'));
        let tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = croppedData.width;
        tempCanvas.height = croppedData.height;
        tempContext.putImageData(croppedData, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        tempCanvas.remove();
        parentDiv.style.borderRadius = '100%';
        canvas.style.backgroundColor = '#fff';
        this.dialogInstance.hide();
        if (this.imgSrc !== '') {
            const img = document.querySelector('#custom-img');
            img.src = this.imgSrc;
        }
    }
    contentTemplate() {
        return (<ImageEditorComponent ref={img => this.imageEditorInstance = img} toolbar={[]} fileOpened={this.fileOpened.bind(this)} created={this.created.bind(this)}></ImageEditorComponent>);
    }
    fileOpened() {
        this.imageEditorInstance.select('circle');
    }
    created() {
        if (this.imageEditorInstance.theme && window.location.href.split('#')[1]) {
            this.imageEditorInstance.theme = window.location.href.split('#')[1].split('/')[1];
        }
    }
    editClicked() {
        this.dialogInstance.show();
        let image = document.querySelector('#custom-img');
        this.imageEditorInstance.open(image.src);
    }
    ;
    render() {
        return (<div className='control-pane'>
                <div className='col-lg-12 control-section e-img-editor-profile'>
                    <div className='e-profile e-hide'>
                        <div className='e-custom-wrapper'>  
                            <canvas id='img-canvas'></canvas>
                            <img alt='img' className='e-custom-img' id='custom-img' onLoad={this.handleImageLoaded.bind(this)} src='src/image-editor/images/profile.png'/>
                            <input type='file' id='img-upload' className='e-custom-file' onChange={this.fileChanged.bind(this)} accept="image/*"/>
                            <span id='custom-edit' className='e-custom-edit' onClick={this.editClicked.bind(this)}>
                                <span className='e-custom-icon sb-icons'></span>
                            </span>
                        </div>
                    </div>
                </div>
                <div id='profile-dialog'>
                <DialogComponent id='profile-dialog' showCloseIcon={true} animationSettings={this.animationSettings} closeOnEscape={true} visible={false} width={'340px'} height={'420px'} ref={dialog => this.dialogInstance = dialog} target='.e-img-editor-profile' header='Edit Profile Image' buttons={this.buttons} content={this.contentTemplate.bind(this)} position={{ X: 'center', Y: 100 }}>
                </DialogComponent>
                </div>
                <div id='action-description'>
                    <p>The Image Editor component provides built-in support to rotate an image using the rotate method and support to crop an image using the select and crop methods.</p>
                </div>
                <div id='description'>
                    <p>In this demo, Image Editor is rendered within a dialog and opens an image by passing its URL path to the open method of the Image Editor control.</p>
                    <p> The following operations are supported in the Image Editor. :  </p>
                    <ul>
                        <li><b>Selection</b> : Multiple selection options are available. The selection region can be a square or circle, customized to various aspect ratios, and customized by dragging and resizing.</li>
                        <li><b>Crop</b> : The image can be cropped based on the selection.</li>
                        <li><b>Rotate</b> : The image can be rotated both clockwise and anticlockwise by 90 degrees.</li>
                    </ul>
                    <p>
                        More information about Image Editor can be found in this 
                        <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/'> documentation section</a>.
                    </p>
                </div>
            </div>);
    }
}
