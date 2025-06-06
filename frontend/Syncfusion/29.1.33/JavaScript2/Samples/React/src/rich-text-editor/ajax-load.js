"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.AjaxContent = void 0;
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./ajax-load.css");
var AjaxContent = /** @class */ (function (_super) {
    __extends(AjaxContent, _super);
    function AjaxContent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AjaxContent.prototype.rendereComplete = function () {
        var _this = this;
        var ajax = new ej2_base_1.Ajax('./src/rich-text-editor/ajax-content.html', 'GET', false);
        ajax.send().then(function (result) {
            _this.rteObj.value = result;
        });
    };
    AjaxContent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rteAjax" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "ajaxloadRTE", ref: function (richtexteditor) { _this.rteObj = richtexteditor; } },
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates how to load content to the editor from an external source using ",
                    React.createElement("code", null, "Ajax library"),
                    ". ")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Rich Text Editor allows you to load content from an external source. The sample content is loaded from \u201CAjax_content.html\u201D file using AJAX library, and when the event is ",
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
    };
    return AjaxContent;
}(sample_base_1.SampleBase));
exports.AjaxContent = AjaxContent;
