"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./profile-picture.css");
var ProfilePicture = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var animationSettings = { effect: "None" };
    var dialogInstance = (0, react_1.useRef)(null);
    var imageEditorInstance = (0, react_1.useRef)(null);
    var imageUpload = (0, react_1.useRef)(null);
    var imageCanvas = (0, react_1.useRef)(null);
    var customImage = (0, react_1.useRef)(null);
    var profile = (0, react_1.useRef)(null);
    var imgSrc = "";
    var fileChanged = function (args) {
        var URL = window.URL;
        var url = URL.createObjectURL(args.target.files[0]);
        imageEditorInstance.current.open(url.toString());
        imageUpload.current.value = null;
        imgSrc = url.toString();
    };
    var handleImageLoaded = function () {
        if (imgSrc === "") {
            var ctx = imageCanvas.current.getContext("2d");
            imageCanvas.current.width =
                customImage.current.width < customImage.current.height
                    ? customImage.current.width
                    : customImage.current.height;
            imageCanvas.current.height = imageCanvas.current.width;
            ctx.drawImage(customImage.current, 0, 0, imageCanvas.current.width, imageCanvas.current.height);
            document.querySelector(".e-profile").classList.remove("e-hide");
        }
    };
    var dlgOpenButtonClick = function () {
        imageUpload.current.click();
    };
    var dlgResetButtonClick = function () {
        imageEditorInstance.current.reset();
    };
    var dlgRotateButtonClick = function () {
        imageEditorInstance.current.rotate(-90);
    };
    var dlgDoneButtonClick = function () {
        imageEditorInstance.current.crop();
        var croppedData = imageEditorInstance.current.getImageData();
        var ctx = imageCanvas.current.getContext("2d");
        var tempCanvas = profile.current.appendChild((0, ej2_base_1.createElement)("canvas"));
        var tempContext = tempCanvas.getContext("2d");
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
    var contentTemplate = function () {
        return (React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { ref: imageEditorInstance, toolbar: [], fileOpened: fileOpened, created: created }));
    };
    var fileOpened = function () {
        imageEditorInstance.current.select("circle");
    };
    var created = function () {
        if (imageEditorInstance.current.theme &&
            window.location.href.split("#")[1]) {
            imageEditorInstance.current.theme = window.location.href
                .split("#")[1]
                .split("/")[1];
        }
    };
    var editClicked = function () {
        dialogInstance.current.show();
        imageEditorInstance.current.open(customImage.current.src);
    };
    var buttons = [
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
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section e-img-editor-profile" },
            React.createElement("div", { className: "e-profile e-hide", ref: profile },
                React.createElement("div", { className: "e-custom-wrapper" },
                    React.createElement("canvas", { id: "img-canvas", ref: imageCanvas }),
                    React.createElement("img", { alt: "img", className: "e-custom-img", id: "custom-img", onLoad: handleImageLoaded, src: "src/image-editor/images/profile.png", ref: customImage }),
                    React.createElement("input", { type: "file", id: "img-upload", className: "e-custom-file", onChange: fileChanged, ref: imageUpload }),
                    React.createElement("span", { id: "custom-edit", className: "e-custom-edit", onClick: editClicked },
                        React.createElement("span", { className: "e-custom-icon sb-icons" }))))),
        React.createElement("div", { id: "profile-dialog" },
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "profile-dialog", showCloseIcon: true, animationSettings: animationSettings, closeOnEscape: true, visible: false, width: "340px", height: "420px", ref: dialogInstance, target: ".e-img-editor-profile", header: "Edit Profile Image", buttons: buttons, content: contentTemplate, position: { X: "center", Y: 100 } })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "The Image Editor component provides built-in support to rotate an image using the rotate method and support to crop an image using the select and crop methods.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demo, Image Editor is rendered within a dialog and opens an image by passing its URL path to the open method of the Image Editor control."),
            React.createElement("p", null, " The following operations are supported in the Image Editor. : "),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Selection"),
                    " : Multiple selection options are available. The selection region can be a square or circle, customized to various aspect ratios, and customized by dragging and resizing."),
                React.createElement("li", null,
                    React.createElement("b", null, "Crop"),
                    " : The image can be cropped based on the selection."),
                React.createElement("li", null,
                    React.createElement("b", null, "Rotate"),
                    " : The image can be rotated both clockwise and anticlockwise by 90 degrees.")),
            React.createElement("p", null,
                "More information about Image Editor can be found in this More information about Image Editor can be found in this More information about Image Editor can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = ProfilePicture;
