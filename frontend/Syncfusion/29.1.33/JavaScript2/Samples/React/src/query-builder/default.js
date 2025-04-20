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
exports.Default = void 0;
var React = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./default.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var base_1 = require("@syncfusion/ej2/base");
var CodeMirror = require("codemirror");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.columnData = [
            {
                field: 'EmployeeID', label: 'EmployeeID', type: 'number', operators: [{ key: 'Equal', value: 'equal' },
                    { key: 'Greater than', value: 'greaterthan' }, { key: 'Less than', value: 'lessthan' }]
            },
            { field: 'FirstName', label: 'FirstName', type: 'string' },
            { field: 'TitleOfCourtesy', label: 'Title Of Courtesy', type: 'boolean', values: ['Mr.', 'Mrs.'] },
            { field: 'Title', label: 'Title', type: 'string' },
            { field: 'HireDate', label: 'HireDate', type: 'date', format: 'dd/MM/yyyy' },
            { field: 'Country', label: 'Country', type: 'string' },
            { field: 'City', label: 'City', type: 'string' }
        ];
        _this.importRules = {
            'condition': 'and',
            'rules': [{
                    'label': 'EmployeeID',
                    'field': 'EmployeeID',
                    'type': 'number',
                    'operator': 'equal',
                    'value': 1
                },
                {
                    'label': 'Title',
                    'field': 'Title',
                    'type': 'string',
                    'operator': 'equal',
                    'value': 'Sales Manager'
                }]
        };
        _this.buttons = [
            {
                buttonModel: {
                    content: 'Cancel',
                    cssClass: 'e-flat',
                },
                click: function () {
                    _this.dialogInstance.hide();
                },
            },
            {
                buttonModel: {
                    content: 'Import',
                    cssClass: 'e-flat',
                    isPrimary: true,
                },
                click: function () {
                    _this.importQuery();
                },
            },
        ];
        _this.updateRule = function () {
            var codeMirrorEditor;
            var validRule = _this.qbObj.getValidRules(_this.qbObj.rule);
            _this.content = JSON.stringify(validRule, null, 4);
            _this.txtAreaElem.value = _this.content;
            /* custom code start */
            document.querySelector('.e-query-preview .preview-content').childNodes[1].remove();
            codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0], {
                mode: 'javascript',
                readOnly: true,
                theme: 'default' // Set your desired theme here
            });
            codeMirrorEditor.setValue(_this.content);
            /* custom code start */
        };
        _this.importQuery = function () {
            try {
                var textAreacontent = document.getElementById('json-content-area');
                _this.qbObj.setRules(JSON.parse(textAreacontent.value));
                _this.updateRule();
                _this.dialogInstance.hide();
            }
            catch (error) {
                var errorElem = document.getElementById('dlgSpan');
                if (!errorElem.classList.contains("error")) {
                    errorElem.style.visibility = 'visible';
                    errorElem.classList.add("error");
                }
            }
        };
        _this.dialogContent = function () {
            return (React.createElement("div", null,
                React.createElement("textarea", { className: "json-content-area", id: "json-content-area" }),
                React.createElement("span", { id: "dlgSpan", style: { visibility: 'hidden' } }, "Invalid Query")));
        };
        _this.dialogOpen = function () {
            var dlgContentElement = document.getElementById('json-content-area');
            var errorElem = document.getElementById('dlgSpan');
            if (dlgContentElement) {
                var validRule = _this.qbObj.getValidRules(_this.qbObj.rule);
                _this.content = JSON.stringify(validRule, null, 4);
                dlgContentElement.value = _this.content;
                errorElem.style.visibility = 'hidden';
                if (errorElem.classList.contains("error")) {
                    errorElem.classList.remove("error");
                }
            }
        };
        _this.copyClipboard = function (args) {
            navigator.clipboard.writeText(_this.content);
            setTimeout(function () {
                (0, base_1.getComponent)(args.target.closest('.e-tooltip'), 'tooltip').close();
            }, 1000);
        };
        _this.handleMouseEnter = function () {
            var elem = document.getElementsByClassName("copy-tooltip");
            elem[0].style.display = 'block';
        };
        _this.handleMouseLeave = function () {
            var elem = document.getElementsByClassName("copy-tooltip");
            elem[0].style.display = 'none';
        };
        return _this;
    }
    Default.prototype.createdControl = function () {
        if (ej2_base_1.Browser.isDevice) {
            this.qbObj.summaryView = true;
        }
        var codeMirrorEditor;
        var validRule = this.qbObj.getValidRules(this.qbObj.rule);
        this.content = JSON.stringify(validRule, null, 4);
        this.txtAreaElem.value = this.content;
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0], {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(this.content);
    };
    Default.prototype.handleClick = function () {
        this.dialogInstance.show();
    };
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "top-right-button" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: "e-btn e-custom-btn", id: "json-btn", onClick: this.handleClick.bind(this) }, "Import JSON")),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-12 control-section" },
                        React.createElement("div", { className: "App" },
                            React.createElement(ej2_react_popups_1.DialogComponent, { id: 'dialog', width: '700px', height: '420px', isModal: true, animationSettings: this.animationSettings, header: "JSON", visible: false, beforeOpen: this.dialogOpen, closeOnEscape: false, showCloseIcon: true, buttons: this.buttons, ref: function (scope) { _this.dialogInstance = scope; } },
                                React.createElement("div", null, this.dialogContent()))),
                        React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { dataSource: data_source_1.employeeData, columns: this.columnData, rule: this.importRules, created: this.createdControl.bind(this), ref: function (scope) { _this.qbObj = scope; } }),
                        React.createElement("div", { className: "e-query-preview", onClick: this.handleMouseEnter, onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
                            React.createElement("div", { style: { border: 'none', width: '100%' } },
                                React.createElement("label", { style: { padding: '10px' } }, "JSON"),
                                React.createElement("div", { style: { border: 'none' } },
                                    React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: this.copyClipboard },
                                        React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                                            React.createElement("div", { className: "e-icons copycode" }))))),
                            React.createElement("div", { className: "preview-content" },
                                React.createElement("textarea", { className: 'e-json-content', title: "JSON Content", ref: function (scope) { _this.txtAreaElem = scope; } })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Query Builder component showing how to import and export a query in JSON format. The query preview can be showcased in the tab component, and the query can be imported to Query Builder using the Import button.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this demo features export and import of queries in JSON format is showcased."),
                React.createElement("p", null, " In mobile mode it is shown in vertical mode."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
