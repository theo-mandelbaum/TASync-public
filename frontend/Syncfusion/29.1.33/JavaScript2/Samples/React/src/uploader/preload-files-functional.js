"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var sample_base_1 = require("../common/sample-base");
require("./uploader.css");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var react_1 = require("react");
var Preloadfiles = function () {
    // Uploader component
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var uploadObj = (0, react_1.useRef)(null);
    var dropElement;
    var asyncSettings;
    var dropContainerRef;
    var dropContainerEle;
    dropContainerEle = null;
    dropContainerRef = function (element) {
        dropContainerEle = element;
    };
    asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove'
    };
    var rendereComplete = function () {
        dropElement = dropContainerEle;
        uploadObj.current.dropArea = dropElement;
        uploadObj.current.dataBind();
        uploadObj.current.element.setAttribute('name', 'UploadFiles');
    };
    var onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    var clearButtonClick = function () {
        uploadObj.current.clearAll();
    };
    return (React.createElement("div", { className: 'control-pane', ref: dropContainerRef },
        React.createElement("div", { className: 'control-section uploadpreview' },
            React.createElement("div", { className: 'col-lg-9' },
                React.createElement("div", { className: 'validation_wrapper' },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'validation', type: 'file', ref: uploadObj, asyncSettings: asyncSettings, removing: onRemoveFile.bind(_this) },
                        React.createElement(ej2_react_inputs_1.FilesDirective, null,
                            React.createElement(ej2_react_inputs_1.UploadedFilesDirective, { name: "Nature", size: 25000, type: ".png" }),
                            React.createElement(ej2_react_inputs_1.UploadedFilesDirective, { name: "TypeScript succinctly", size: 12000, type: ".pdf" }),
                            React.createElement(ej2_react_inputs_1.UploadedFilesDirective, { name: "ASP.NET", size: 17000, type: ".docx" }))))),
            React.createElement("div", { className: 'property-section preload-panel col-lg-3' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("div", { className: 'panel-style' },
                        React.createElement("button", { className: "e-btn e-css", onClick: clearButtonClick.bind(_this), id: "clearbtn", title: "Clear All" }, "Clear All"))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " example demonstrates how to pre-load the files of the Uploader. The already uploaded files are configured in file list to view and remove them.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Uploader component allows to load initial list of files which are already uploaded in server. The preload files are useful to view and remove from server. Also, you can achieve state persistence on page refresh."),
            React.createElement("p", null,
                "For more information, you can refer to the Preload Files section from this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/async/#preload-files" }, "documentation section"),
                "."),
            React.createElement("p", null, "To achieve state persistence, you can refer to this How-to section."))));
};
exports.default = Preloadfiles;
