"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ej2_react_richtexteditor_2 = require("@syncfusion/ej2-react-richtexteditor");
require("./image.css");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function ImageSample() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var formatdrop;
    var readonly;
    var value = "Blob";
    var fields = { text: "text", value: "value" };
    var formatData = [
        { text: 'Blob', value: 'Blob' },
        { text: 'Base64', value: 'Base64' }
    ];
    var image = ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-',
        'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension',
        {
            tooltipText: 'Rotate Left',
            template: '<button class="e-tbar-btn e-btn" id="roatateLeft"><span class="e-btn-icon e-icons e-rotate-left"></span>'
        },
        {
            tooltipText: 'Rotate Right',
            template: '<button class="e-tbar-btn e-btn" id="roatateRight"><span class="e-btn-icon e-icons e-rotate-right"></span>'
        }];
    var quickToolbarSettings = {
        image: image
    };
    function onToolbarClick(e) {
        var nodeObj = new ej2_react_richtexteditor_2.NodeSelection();
        var range = nodeObj.getRange(rteObj.contentModule.getDocument());
        var imgEle = nodeObj.getNodeCollection(range)[0];
        if (e.item.tooltipText === 'Rotate Right') {
            var transform = (imgEle.style.transform === '') ? 0 :
                parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10);
            imgEle.style.transform = 'rotate(' + (transform + 90) + 'deg)';
            rteObj.formatter.saveData();
            rteObj.formatter.enableUndo(rteObj);
        }
        else if (e.item.tooltipText === 'Rotate Left') {
            var transform = (imgEle.style.transform === '') ? 0 :
                Math.abs(parseInt(imgEle.style.transform.split('(')[1].split(')')[0], 10));
            imgEle.style.transform = 'rotate(-' + (transform + 90) + 'deg)';
            rteObj.formatter.saveData();
            rteObj.formatter.enableUndo(rteObj);
        }
    }
    var onCheckChange = function (args) {
        rteObj.enableAutoUrl = args.checked;
    };
    var ondropChange = function () {
        if (formatdrop.value === 'Base64') {
            rteObj.insertImageSettings.saveFormat = 'Base64';
        }
        else {
            rteObj.insertImageSettings.saveFormat = 'Blob';
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-8' },
            React.createElement("div", { className: 'control-section', id: "rteAPI" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "imageRTE", ref: function (richtexteditor) { rteObj = richtexteditor; }, toolbarClick: onToolbarClick.bind(this), quickToolbarSettings: quickToolbarSettings },
                        React.createElement("h2", null,
                            "Insert Image in Rich Text Editor!",
                            React.createElement("br", null)),
                        React.createElement("p", null,
                            "You can insert and edit images within this editor. Click inside the editor and use the ",
                            React.createElement("strong", null, "image tool"),
                            " to add an image."),
                        React.createElement("h5", null, "What You Can Do"),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Insert Images:"),
                            " Upload images from local storage or provide an image URL."),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Resize & Drag:"),
                            " Easily adjust image dimensions and reposition them within the content."),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Align Images:"),
                            " Set images to align ",
                            React.createElement("strong", null, "left, center, or right"),
                            "."),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Caption Support:"),
                            " Add captions to describe your images."),
                        React.createElement("li", null,
                            React.createElement("strong", null, "Replace & Remove:"),
                            " Change or delete images as needed."),
                        React.createElement("h5", null, "Try It Out!"),
                        React.createElement("p", null,
                            React.createElement("img", { id: "rteImageID", style: { width: '300px', height: '300px', transform: 'rotate(0deg)' }, alt: "Editor Features Overview", src: "https://cdn.syncfusion.com/ej2/richtexteditor-resources/RTE-Portrait.png", className: "e-rte-image e-imginline" })),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] }))))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "rteAPIProperty" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", style: { width: '100%', margin: '10px' } },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                React.createElement("div", null, "EnableAutoUrl")),
                            React.createElement("td", { style: { paddingTop: '0px' } },
                                React.createElement("div", { style: { paddingLeft: '0px', paddingTop: '0px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, ref: function (scope) { readonly = scope; }, change: onCheckChange.bind(this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '8px', width: '50%' } },
                                React.createElement("div", null, "Save Format ")),
                            React.createElement("td", null,
                                React.createElement("div", { style: { paddingLeft: '10px', paddingTop: '0px' } },
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "formattingOption", dataSource: formatData, ref: function (dropdownlist) { formatdrop = dropdownlist; }, fields: fields, change: ondropChange.bind(this), value: value, popupHeight: "200px" })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the option to insert the image to the Rich Text Editor content. Click the image button from the toolbar item to insert the image.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Image tools used to insert an image to the Rich Text Editor and click on the image to easily customize the image using quick toolbar. The quick toolbar has the following items"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Replace"),
                    " \u2013 can replace the image with some other image."),
                React.createElement("li", null,
                    React.createElement("code", null, "Align"),
                    " \u2013 Align the image with left, right and justify."),
                React.createElement("li", null,
                    React.createElement("code", null, "Image captions"),
                    " \u2013 set the captions for the image."),
                React.createElement("li", null,
                    React.createElement("code", null, "Change size"),
                    " \u2013 modify width and height of image."),
                React.createElement("li", null,
                    React.createElement("code", null, "Delete"),
                    " \u2013 delete the image."),
                React.createElement("li", null,
                    React.createElement("code", null, "Link"),
                    " \u2013 provide the link to the image."),
                React.createElement("li", null,
                    React.createElement("code", null, "Display"),
                    " - display the image as inline or with break."),
                React.createElement("li", null,
                    React.createElement("code", null, "Alternate text"),
                    " \u2013 provide the alternative text for the image if the image is not present in the location."),
                React.createElement("li", null,
                    React.createElement("code", null, "Custom Tools"),
                    " - \"rotation\" related commands are added as custom commands to the image element"),
                React.createElement("li", null,
                    React.createElement("code", null, "Resize"),
                    " \u2013 can resize the image dimension with resize options.")),
            "Quick commands are opened as context-menu on clicking the corresponding element. The commands must be passed as string collection to image, text, and link attributes of the quickToolbarSettings property.",
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module:")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use image tool, we need to inject ",
                React.createElement("code", null, "Image"),
                " modules into the services."))));
}
exports.default = ImageSample;
