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
exports.ImportWord = void 0;
/**
 * Rich Text Editor import-word sample
 */
var React = require("react");
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var sample_base_1 = require("../common/sample-base");
var ImportWord = /** @class */ (function (_super) {
    __extends(ImportWord, _super);
    function ImportWord() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = 'https://ej2services.syncfusion.com/production/web-services/';
        _this.items = [
            'Undo', 'Redo', '|', 'ImportWord', '|',
            'Bold', 'Italic', 'Underline', 'StrikeThrough', '|',
            'FontName', 'FontSize', 'FontColor', 'BackgroundColor', '|',
            'Formats', 'Alignments', 'Blockquote', '|', 'NumberFormatList', 'BulletFormatList',
            '|', 'CreateLink', 'Image', 'CreateTable', '|', 'ClearFormat', 'SourceCode'
        ];
        _this.rteValue = "<h2 style=\"text-align: center;\">Invitation to Microsoft Webinar Meet-Up</h2><p>\n                    Dear Guest,\n                </p><p>\n                    We're thrilled to extend a special invitation to you for an exclusive Microsoft webinar meet-up, where we'll explore the latest innovations and insights driving the future of technology. As a valued member of our community, we believe this event will offer invaluable knowledge and networking opportunities.\n                </p><h2>Event Details:</h2><table class=\"e-rte-table\" style=\"width: 100%; height: 125px;\">\n                    <tbody>\n                    <tr style=\"height: 20%;\">\n                        <th class=\"\">Time:</th>\n                        <td>10:00 AM - 12:00 PM</td>\n                    </tr>\n                    <tr style=\"height: 20%;\">\n                        <th>Duration:</th>\n                        <td>2 hours</td>\n                    </tr>\n                    <tr style=\"height: 20%;\">\n                        <th>Platform:</th>\n                        <td>Microsoft Teams</td>\n                    </tr>\n                </tbody></table><p><br></p><h2>Agenda:</h2><ul>\n                    <li>Introduction to Cutting-Edge Microsoft Technologies</li>\n                    <li>Deep Dive into AI in Business: Leveraging Microsoft Azure Solutions</li>\n                    <li>Live Q&amp;A Session with Industry Experts</li>\n                    <li>Networking Opportunities with Peers and Professionals</li>\n                </ul><h2>Why Attend?</h2><ul>\n                    <li>Gain insights into the latest trends and advancements in technology.</li>\n                    <li>Interact with industry experts and expand your professional network.</li>\n                    <li>Get your questions answered in real-time during the live Q&amp;A session.</li>\n                    <li>Access exclusive resources and offers available only to webinar attendees.</li>\n                </ul><p>\n                    Feel free to invite your colleagues and peers who might benefit from this enriching experience. Simply forward this email to them or share the event details.\n                </p><p>\n                    We're looking forward to your participation and to exploring the exciting world of Microsoft technology together. Should you have any questions or require further information, please don't hesitate to contact us at <a href=\"mailto:webinar@company.com\">webinar@company.com</a>.</p><p>\n                <br></p><p>Warm regards,</p><p>John Doe<br>Event Coordinator<br>ABC Company</p>";
        _this.insertImageSettings = {
            saveUrl: _this.hostUrl + 'api/RichTextEditor/SaveFile',
            removeUrl: _this.hostUrl + 'api/RichTextEditor/DeleteFile',
            path: _this.hostUrl + 'RichTextEditor/'
        };
        _this.toolbarSettings = {
            items: _this.items
        };
        _this.importWord = {
            serviceUrl: _this.hostUrl + 'api/RichTextEditor/ImportFromWord',
        };
        return _this;
    }
    ImportWord.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rteTools" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "importDocument", importWord: this.importWord, toolbarSettings: this.toolbarSettings, insertImageSettings: this.insertImageSettings, value: this.rteValue, enableXhtml: true },
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.ImportExport] })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example illustrates how to use the import/export feature of the Rich Text Editor to convert the editor content into a PDF or Word document.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This sample demonstrates the ",
                    React.createElement("code", null, "Import/Export"),
                    " feature of the Rich Text Editor, which allows users to import the Word document into the editor. The word document can be imported as Rich Text Editor content by clicking the import to Word icon, browsing for the document, and uploading it to the server, where it is converted to HTML and then sent to the Rich Text Editor as its value."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Rich Text Editor component features are segregated into individual feature-wise modules. To use Rich Text Editor feature, we need to inject ",
                    React.createElement("code", null, "HtmlEditor, Toolbar, Link, Image, Count, QuickToolbar, Table, PasteCleanup, ImportExport"),
                    " modules into the services."))));
    };
    return ImportWord;
}(sample_base_1.SampleBase));
exports.ImportWord = ImportWord;
