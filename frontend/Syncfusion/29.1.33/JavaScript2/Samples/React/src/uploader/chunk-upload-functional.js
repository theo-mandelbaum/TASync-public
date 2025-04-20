"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./uploader.css");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ChunkUpload = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Uploader component
    var _a = (0, react_1.useState)(500000), chunkSize = _a[0], setChunkSize = _a[1];
    var uploadObj = (0, react_1.useRef)(null);
    var ddlDatas;
    var fields;
    var value = 0;
    var isInteraction;
    var asyncSettings;
    var autoUpload;
    ddlDatas = [
        { value: 500000, size: '500 KB' },
        { value: 1000000, size: '1 MB' },
        { value: 2000000, size: '2 MB' }
    ];
    fields = { text: 'size', value: 'value' };
    isInteraction = false;
    asyncSettings = {
        saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Save',
        removeUrl: 'https://ej2services.syncfusion.com/production/web-services/api/FileUploader/Remove',
        chunkSize: chunkSize
    };
    autoUpload = false;
    var onChange = function (args) {
        setChunkSize(parseInt(args.itemData.value, 10));
    };
    var onRemoveFile = function (args) {
        args.postRawFile = false;
    };
    // to update flag variable value for automatic pause and resume
    var onPausing = function (args) {
        if (args.event !== null && !navigator.onLine) {
            isInteraction = true;
        }
        else {
            isInteraction = false;
        }
    };
    // to update flag variable value for automatic pause and resume
    var onResuming = function (args) {
        if (args.event !== null && !navigator.onLine) {
            isInteraction = true;
        }
        else {
            isInteraction = false;
        }
    };
    // to prevent triggering chunk-upload failure event and to pause uploading on network failure
    var onBeforeFailure = function (args) {
        var proxy = _this;
        args.cancel = !isInteraction;
        // interval to check network availability on every 500 milliseconds
        var clearTimeInterval = setInterval(function () {
            if (navigator.onLine && !(0, ej2_base_1.isNullOrUndefined)(proxy.uploadObj.filesData[0]) && proxy.uploadObj.filesData[0].statusCode == 4) {
                proxy.uploadObj.resume(proxy.uploadObj.filesData);
                clearSetInterval();
            }
            else {
                if (!proxy.isInteraction && !(0, ej2_base_1.isNullOrUndefined)(proxy.uploadObj.filesData[0]) && proxy.uploadObj.filesData[0].statusCode == 3) {
                    proxy.uploadObj.pause(proxy.uploadObj.filesData);
                }
            }
        }, 500);
        // clear Interval after when network is available.
        var clearSetInterval = function () {
            clearInterval(clearTimeInterval);
        };
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section row uploadpreview' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'upload_wrapper' },
                    React.createElement(ej2_react_inputs_1.UploaderComponent, { id: 'chunkUpload', type: 'file', ref: uploadObj, asyncSettings: asyncSettings, autoUpload: autoUpload, removing: onRemoveFile.bind(_this), pausing: onPausing.bind(_this), resuming: onResuming.bind(_this), chunkFailure: onBeforeFailure.bind(_this) }))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "chunk-size" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'chunk-table' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: 'chunk-td' }, "Chunk Size"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "chunksize", index: value, dataSource: ddlDatas, fields: fields, change: onChange.bind(_this), placeholder: "Select chunk size" })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { href: "https://www.syncfusion.com/react-ui-components/react-file-upload", target: "_blank" }, "\u00A0React File Upload"),
                " example demonstrates the chunk upload functionalities of the Uploader component. Browse or drag-and-drop a large file to upload with pause, resume, and retry options."),
            React.createElement("p", null, "Also, configured property panel to change the chunk size dynamically.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "When the file size is large or transfer the file with slow network connection, the chunk upload feature slices the files and upload the sliced chunks to server in sequential order using the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/uploader/asyncSettingsModel#chunksize", target: "_blank" }, "\u00A0chunkSize"),
                " API. It will slice the files and upload it in sequential order."),
            React.createElement("p", null, "The sample is configured with the following options:"),
            React.createElement("ul", null,
                React.createElement("li", null, "While uploading, you can pause the upload and resume it later."),
                React.createElement("li", null, " If the upload fails, retry option will be enabled."),
                React.createElement("li", null, " The sample is configured with maximum file size as `100 MB` to upload.")),
            React.createElement("h4", null, "Automatic pause and resume"),
            React.createElement("p", null,
                "If the application lost its connection (",
                React.createElement("code", null, "offline"),
                "), the upload component pauses the process automatically. After the connection is up (",
                React.createElement("code", null, "online"),
                "), the upload component will resume its process."),
            React.createElement("p", null,
                "More information on the Uploader instantiation can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/uploader/chunk-upload/" }, "documentation section"),
                "."))));
};
exports.default = ChunkUpload;
