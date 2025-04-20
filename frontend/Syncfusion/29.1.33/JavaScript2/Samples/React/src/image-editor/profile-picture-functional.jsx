import * as React from 'react';
import { useEffect, useRef } from 'react';
import { createElement } from '@syncfusion/ej2-base';
import { ImageEditorComponent } from '@syncfusion/ej2-react-image-editor';
import { DialogComponent } from '@syncfusion/ej2-react-popups';
import { updateSampleSection } from '../common/sample-base';
import './profile-picture.css';
const ProfilePicture = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let animationSettings = { effect: "None" };
    let dialogInstance = useRef(null);
    let imageEditorInstance = useRef(null);
    let imageUpload = useRef(null);
    let imageCanvas = useRef(null);
    let customImage = useRef(null);
    let profile = useRef(null);
    let imgSrc = "";
    const fileChanged = (args) => {
        const URL = window.URL;
        const url = URL.createObjectURL(args.target.files[0]);
        imageEditorInstance.current.open(url.toString());
        imageUpload.current.value = null;
        imgSrc = url.toString();
    };
    const handleImageLoaded = () => {
        if (imgSrc === "") {
            let ctx = imageCanvas.current.getContext("2d");
            imageCanvas.current.width =
                customImage.current.width < customImage.current.height
                    ? customImage.current.width
                    : customImage.current.height;
            imageCanvas.current.height = imageCanvas.current.width;
            ctx.drawImage(customImage.current, 0, 0, imageCanvas.current.width, imageCanvas.current.height);
            document.querySelector(".e-profile").classList.remove("e-hide");
        }
    };
    const dlgOpenButtonClick = () => {
        imageUpload.current.click();
    };
    const dlgResetButtonClick = () => {
        imageEditorInstance.current.reset();
    };
    const dlgRotateButtonClick = () => {
        imageEditorInstance.current.rotate(-90);
    };
    const dlgDoneButtonClick = () => {
        imageEditorInstance.current.crop();
        let croppedData = imageEditorInstance.current.getImageData();
        let ctx = imageCanvas.current.getContext("2d");
        let tempCanvas = profile.current.appendChild(createElement("canvas"));
        let tempContext = tempCanvas.getContext("2d");
        tempCanvas.width = croppedData.width;
        tempCanvas.height = croppedData.height;
        tempContext.putImageData(croppedData, 0, 0);
        ctx.clearRect(0, 0, imageCanvas.current.width, imageCanvas.current.height);
        ctx.drawImage(tempCanvas, 0, 0, imageCanvas.current.width, imageCanvas.current.height);
        tempCanvas.remove();
        profile.current.style.borderRadius = "100%";
        imageCanvas.current.style.backgroundColor = "#fff";
        dialogInstance.current.hide();
        if (imgSrc !== "") {
            customImage.current.src = imgSrc;
        }
    };
    const contentTemplate = () => {
        return (<ImageEditorComponent ref={imageEditorInstance} toolbar={[]} fileOpened={fileOpened} created={created}></ImageEditorComponent>);
    };
    const fileOpened = () => {
        imageEditorInstance.current.select("circle");
    };
    const created = () => {
        if (imageEditorInstance.current.theme &&
            window.location.href.split("#")[1]) {
            imageEditorInstance.current.theme = window.location.href
                .split("#")[1]
                .split("/")[1];
        }
    };
    const editClicked = () => {
        dialogInstance.current.show();
        imageEditorInstance.current.open(customImage.current.src);
    };
    let buttons = [
        {
            click: dlgOpenButtonClick,
            buttonModel: {
                content: "Open",
                cssClass: "e-custom-img-btn e-img-custom-open",
            },
        },
        {
            click: dlgResetButtonClick,
            buttonModel: {
                content: "Reset",
                cssClass: "e-custom-img-btn e-img-custom-reset",
            },
        },
        {
            click: dlgRotateButtonClick,
            buttonModel: {
                content: "Rotate",
                cssClass: "e-custom-img-btn e-img-custom-rotate",
            },
        },
        {
            click: dlgDoneButtonClick,
            buttonModel: {
                content: "Apply",
                cssClass: "e-custom-img-btn e-img-custom-apply",
                isPrimary: true,
            },
        },
    ];
    return (<div className="control-pane">
            <div className="col-lg-12 control-section e-img-editor-profile">
                <div className="e-profile e-hide" ref={profile}>
                    <div className="e-custom-wrapper">
                        <canvas id="img-canvas" ref={imageCanvas}></canvas>
                        <img alt="img" className="e-custom-img" id="custom-img" onLoad={handleImageLoaded} src="src/image-editor/images/profile.png" ref={customImage}/>
                        <input type="file" id="img-upload" className="e-custom-file" onChange={fileChanged} ref={imageUpload}/>
                        <span id="custom-edit" className="e-custom-edit" onClick={editClicked}>
                            <span className="e-custom-icon sb-icons"></span>
                        </span>
                    </div>
                </div>
            </div>
            <div id="profile-dialog">
                <DialogComponent id="profile-dialog" showCloseIcon={true} animationSettings={animationSettings} closeOnEscape={true} visible={false} width={"340px"} height={"420px"} ref={dialogInstance} target=".e-img-editor-profile" header="Edit Profile Image" buttons={buttons} content={contentTemplate} position={{ X: "center", Y: 100 }}></DialogComponent>
            </div>
            <div id="action-description">
                <p>
                    The Image Editor component provides built-in support to rotate an
                    image using the rotate method and support to crop an image using the
                    select and crop methods.
                </p>
            </div>
            <div id="description">
                <p>
                    In this demo, Image Editor is rendered within a dialog and opens an
                    image by passing its URL path to the open method of the Image Editor
                    control.
                </p>
                <p> The following operations are supported in the Image Editor. : </p>
                <ul>
                    <li>
                        <b>Selection</b> : Multiple selection options are available. The
                        selection region can be a square or circle, customized to various
                        aspect ratios, and customized by dragging and resizing.
                    </li>
                    <li>
                        <b>Crop</b> : The image can be cropped based on the selection.
                    </li>
                    <li>
                        <b>Rotate</b> : The image can be rotated both clockwise and
                        anticlockwise by 90 degrees.
                    </li>
                </ul>
                <p>
                    More information about Image Editor can be found in this
                        More information about Image Editor can be found in this 
                    More information about Image Editor can be found in this
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/">
                        documentation section
                    </a>
                    .
                </p>
            </div>
        </div>);
};
export default ProfilePicture;
