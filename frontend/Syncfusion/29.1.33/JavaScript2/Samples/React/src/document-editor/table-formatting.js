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
exports.TableFormatView = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_documenteditor_1 = require("@syncfusion/ej2-react-documenteditor");
var title_bar_1 = require("./title-bar");
require("./default.component.css");
ej2_react_documenteditor_1.DocumentEditorContainerComponent.Inject(ej2_react_documenteditor_1.Toolbar);
// tslint:disable:max-line-length
var TableFormatView = /** @class */ (function (_super) {
    __extends(TableFormatView, _super);
    function TableFormatView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.hostUrl = 'https://ej2services.syncfusion.com/production/web-services/api/documenteditor/';
        _this.onLoadDefault = function () {
            // tslint:disable
            var defaultDocument = { "sfdt": "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" };
            // tslint:enable        
            _this.container.documentEditor.open(JSON.stringify(defaultDocument));
            _this.container.documentEditor.documentName = 'Table Formatting';
            _this.titleBar.updateDocumentTitle();
            _this.container.documentEditor.documentEditorSettings.showRuler = true;
            _this.container.documentChange = function () {
                _this.titleBar.updateDocumentTitle();
                _this.container.documentEditor.focusIn();
            };
        };
        return _this;
    }
    TableFormatView.prototype.rendereComplete = function () {
        window.onbeforeunload = function () {
            return 'Want to save your changes?';
        };
        this.container.documentEditor.pageOutline = '#E0E0E0';
        this.container.documentEditor.acceptTab = true;
        this.container.documentEditor.resize();
        this.titleBar = new title_bar_1.TitleBar(document.getElementById('documenteditor_titlebar'), this.container.documentEditor, true);
        this.onLoadDefault();
    };
    TableFormatView.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { id: 'documenteditor_titlebar', className: "e-de-ctn-title" }),
                React.createElement("div", { id: "documenteditor_container_body" },
                    React.createElement(ej2_react_documenteditor_1.DocumentEditorContainerComponent, { id: "container", ref: function (scope) { _this.container = scope; }, style: { 'display': 'block' }, height: '590px', serviceUrl: this.hostUrl, enableToolbar: true, locale: 'en-US' }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates table formatting options in document editor such as cell margins, cell spacing, horizontal merge, vertical merge, border styles, background color, and more.")),
            React.createElement("div", { id: "description" },
                React.createElement("div", null,
                    React.createElement("p", null, "In this example, you can find all the table formatting features."),
                    React.createElement("ul", null,
                        React.createElement("li", null, "Cell margins and cell spacing.."),
                        React.createElement("li", null, "Horizontal and vertical cell merge."),
                        React.createElement("li", null, "Borders and shading.")),
                    React.createElement("p", { style: { 'display': 'block' } },
                        " More information about the document editor features can be found in this ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/document-editor/table-format/" }, "documentation section."))))));
    };
    return TableFormatView;
}(sample_base_1.SampleBase));
exports.TableFormatView = TableFormatView;
