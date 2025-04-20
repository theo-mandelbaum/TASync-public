"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./ajax-load.css");
function AjaxContent() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
        rendereComplete();
    }, []);
    var rteObj;
    function rendereComplete() {
        var fetch = new ej2_base_1.Fetch('./src/rich-text-editor/ajax-content.html', 'GET');
        fetch.send().then(function (result) {
            rteObj.value = result;
        });
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rteAjax" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "ajaxloadRTE", ref: function (richtexteditor) { rteObj = richtexteditor; } },
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates how to load content to the editor from an external source using ",
                React.createElement("code", null, "Fetch library"),
                ". ")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Rich Text Editor allows you to load content from an external source. The sample content is loaded from \u201CAjax_content.html\u201D file using Fetch library, and when the event is ",
                React.createElement("code", null, "successful"),
                " the content is loaded into the editor using ",
                React.createElement("code", null, "value"),
                " property"),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                React.createElement("code", null, "Toolbar, Link, Image, HtmlEditor, QuickToolbar, PasteCleanup"),
                " modules into the services."))));
}
exports.default = AjaxContent;
