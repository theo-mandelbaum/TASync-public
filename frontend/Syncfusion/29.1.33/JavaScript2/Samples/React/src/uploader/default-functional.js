"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./uploader.css");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var react_1 = require("react");
var Default = function () {
    // Uploader component
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isAutoUpload = _a[0], setIsAutoUpload = _a[1];
    var _b = (0, react_1.useState)(false), isSequentialUpload = _b[0], setIsSequentialUpload = _b[1];
    var uploadObj = (0, react_1.useRef)(null);
    var asyncSettings;
    var dropContainerRef;
    var dropContainerEle = null;
    dropContainerEle = null;
    dropContainerRef = function (element) {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    var rendereComplete = function () {
        uploadObj.current.dropArea = dropContainerEle;
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
        uploadObj.current.dataBind();
    };
    var onChange = function (args) {
        setIsAutoUpload(args.checked);
        uploadObj.current.clearAll();
    };
    var onChanged = function (args) {
        setIsSequentialUpload(args.checked);
        uploadObj.current.clearAll();
    };
    var onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    return (React.createElement("div", { className: 'control-pane', ref: dropContainerRef },
        React.createElement("div", { className: 'control-section row uploadpreview' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement("div", { className: 'upload_wrapper' },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'fileUpload', type: 'file', ref: uploadObj, asyncSettings: asyncSettings, removing: onRemoveFile.bind(_this), autoUpload: isAutoUpload, sequentialUpload: isSequentialUpload }))),
            React.createElement("div", { className: 'property-section col-lg-3', id: "uploader" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("div", { className: 'panel-style' },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, label: 'Auto Upload', change: onChange.bind(_this) })),
                    React.createElement("div", { className: 'panel-style' },
                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, label: 'Sequential Upload', change: onChanged.bind(_this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " example demonstrates the default functionalities of the file upload component with auto upload and sequential upload options. Browse or drag-and-drop the files which you want to upload to the server and upload it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Uploader component is useful to upload images, documents, and other files. By default, the component allows to upload multiple files to browse and upload it to server. The selected files append to the file list that contains file details such as name, type, and size."),
            React.createElement("p", null, "You can manage the files in server after received the uploaded files. When the files are successfully uploaded to server, the remove button will be change to bin button. The uploaded files can be removed by click on the bin button."),
            React.createElement("p", null, "The progress bar displays for each file upload to denote its upload progress. Once the file upload gets success, the progress bar disappear and corresponding upload status message will be displayed in same place."),
            React.createElement("p", null,
                "More information on the Uploader instantiation can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = Default;
