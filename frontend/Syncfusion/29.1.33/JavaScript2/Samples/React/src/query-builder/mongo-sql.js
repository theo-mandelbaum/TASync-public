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
exports.Template = void 0;
var React = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./query-preview.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var data_source_1 = require("./data-source");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var CodeMirror = require("codemirror");
ej2_react_querybuilder_1.QueryBuilderComponent.Inject(ej2_react_querybuilder_1.QueryLibrary);
var frameworkTemplate = function (props) {
    var ds = ["React", "Angular", "Vue", "TypeScript", "JavaScript"];
    var state = Object.assign({}, props);
    var args = state;
    var frameworkChange = function (event) {
        var qryBldrObj = (0, ej2_base_1.getComponent)(document.getElementById('querybuilder'), 'query-builder');
        var elem = document.getElementById(args.ruleID).querySelector('.e-rule-value');
        qryBldrObj.notifyChange(event.value, elem, 'value');
    };
    return (React.createElement("div", null,
        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: ds, value: args.rule.value, change: frameworkChange })));
};
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template(args) {
        var _this = _super.call(this, args) || this;
        _this.headertext = [
            { text: "SQL" },
            { text: "MongoDB" }
        ];
        _this.items = [
            {
                text: 'Import Mongo Query'
            },
            {
                text: 'Import Inline Sql'
            },
            {
                text: 'Import Parameter Sql'
            },
            {
                text: 'Import Named Parameter Sql'
            }
        ];
        _this.mongoQuery = '{';
        _this.queryType = 'inline';
        _this.currentvalue = {
            value: '',
            rule: ''
        };
        _this.currentIndex = 0;
        _this.SQLTemplate = function () {
            var isInline = _this.queryType === "inline";
            var isParameter = _this.queryType === "parameter";
            var isNamedParameter = _this.queryType === "namedParameter";
            return (React.createElement("div", { className: "preview-content", onClick: _this.handleMouseEnter, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave },
                React.createElement("div", { className: "e-preview-options" },
                    React.createElement("label", null, "Format Info:"),
                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { cssClass: "e-radio-option", change: _this.change, label: "Inline", checked: isInline, name: "state", value: "Inline" }),
                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { cssClass: "e-radio-option", checked: isParameter, change: _this.change, label: "Parameter", name: "state", value: "Parameter" }),
                    React.createElement(ej2_react_buttons_1.RadioButtonComponent, { cssClass: "e-radio-option", checked: isNamedParameter, change: _this.change, label: "Named Parameter", name: "state", value: "NamedParameter" }),
                    React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: _this.copyClipboard },
                        React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                            React.createElement("div", { className: "e-icons copycode" })))),
                React.createElement("textarea", { className: "e-sql-content", style: { display: 'none' } })));
        };
        _this.MongoDBTemplate = function () {
            return (React.createElement("div", { className: "preview-content", onClick: _this.handleMouseEnter, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave },
                React.createElement("div", { className: "e-preview-options" },
                    React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: _this.copyClipboard },
                        React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                            React.createElement("div", { className: "e-icons copycode" })))),
                React.createElement("textarea", { className: "e-mongo-content", style: { display: 'none' } })));
        };
        _this.tabCreated = function (args) {
            setTimeout(function () {
                _this.updateSQLContentTemplate();
            }, 100);
        };
        _this.changeTab = function (args) {
            _this.currentIndex = args.selectedIndex;
            setTimeout(function () {
                _this.updateContentTemplate();
            }, 100);
        };
        _this.updateContentTemplate = function () {
            switch (_this.currentIndex) {
                case 0:
                    _this.updateSQLContentTemplate();
                    break;
                case 1:
                    _this.updateMongoContentTemplate();
                    break;
            }
        };
        _this.updateMongoContentTemplate = function () {
            var codeMirrorEditor;
            var validRule = _this.qryBldrObj.getValidRules(_this.qryBldrObj.rule);
            var mongoQuery = JSON.parse(_this.qryBldrObj.getMongoQuery(validRule));
            mongoQuery = JSON.stringify(mongoQuery, null, 4);
            _this.content = mongoQuery;
            /* custom code start */
            _this.clearHighlight();
            codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-mongo-content')[0], {
                mode: 'javascript',
                readOnly: true,
                theme: 'default' // Set your desired theme here
            });
            codeMirrorEditor.setValue(_this.content);
            /* custom code end */
            if (!codeMirrorEditor) {
                document.getElementsByClassName('e-mongo-content')[0].textContent = _this.content;
                document.getElementsByClassName('e-mongo-content')[0].style.display = 'block';
            }
        };
        _this.change = function (args) {
            _this.queryType = args.value.toLowerCase();
            _this.updateSQLContentTemplate();
        };
        _this.updateSQLContentTemplate = function () {
            var codeMirrorEditor;
            _this.content = _this.updateSQLContent();
            /* custom code start */
            _this.clearHighlight();
            codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-sql-content')[0], {
                readOnly: true,
                lineWrapping: true,
                theme: 'default', // Set your desired theme here
            });
            codeMirrorEditor.setValue(_this.content);
            /* custom code end */
            if (!codeMirrorEditor) {
                document.getElementsByClassName('e-sql-content')[0].textContent = _this.content;
                document.getElementsByClassName('e-sql-content')[0].style.display = 'block';
            }
        };
        _this.updateSQLContent = function () {
            var content;
            var qbrule = _this.qryBldrObj.getValidRules(_this.qryBldrObj.rule);
            var sqlJSON;
            switch (_this.queryType) {
                case 'inline':
                    content = _this.qryBldrObj.getSqlFromRules(qbrule);
                    ;
                    break;
                case 'parameter':
                    content = _this.convertParameterSql(qbrule);
                    break;
                default:
                    content = _this.convertNamedParameterSql(qbrule);
                    break;
            }
            return content;
        };
        _this.convertParameterSql = function (qbrule) {
            var content = JSON.stringify(_this.qryBldrObj.getParameterizedSql(qbrule), null, 4);
            return content;
        };
        _this.convertNamedParameterSql = function (qbrule) {
            var content = JSON.stringify(_this.qryBldrObj.getParameterizedNamedSql(qbrule), null, 4);
            return content;
        };
        /* custom code start */
        _this.handleMouseEnter = function () {
            var elem = document.getElementsByClassName("copy-tooltip");
            for (var i = 0; i < elem.length; i++) {
                if (_this.tabObj.selectedItem == i) {
                    elem[i].style.display = 'block';
                }
            }
        };
        _this.handleMouseLeave = function () {
            var elem = document.getElementsByClassName("copy-tooltip");
            for (var i = 0; i < elem.length; i++) {
                if (_this.tabObj.selectedItem == i) {
                    elem[i].style.display = 'none';
                }
            }
        };
        /* custom code end */
        _this.copyClipboard = function (args) {
            navigator.clipboard.writeText(_this.content);
            setTimeout(function () {
                (0, ej2_base_1.getComponent)(args.target.closest('.e-tooltip'), 'tooltip').close();
            }, 1000);
        };
        /* custom code start */
        _this.clearHighlight = function () {
            var codeMirrorElem = document.getElementsByClassName('e-query-preview')[0].querySelectorAll('.CodeMirror');
            for (var i = codeMirrorElem.length - 1; i >= 0; i--) {
                codeMirrorElem[i].remove();
            }
        };
        /* custom code end */
        _this.updateRule = function () {
            _this.updateContentTemplate();
        };
        // Handler used to reposition the tooltip on page scroll
        _this.dialogContent = function () {
            return (React.createElement("div", null,
                React.createElement("textarea", { className: "mongo-text-area", id: "content-area" }),
                React.createElement("span", { id: "dlgSpan", style: { visibility: 'hidden' } }, "Invalid Query")));
        };
        _this.importQuery = function () {
            try {
                var textAreacontent = document.getElementById('content-area');
                if (_this.currentvalue.rule != 'sql') {
                    var textAreaValue = JSON.parse(textAreacontent.value);
                }
                switch (_this.currentvalue.rule) {
                    case 'mongo':
                        _this.qryBldrObj.setMongoQuery(textAreacontent.value);
                        break;
                    case 'namedparameter':
                        _this.qryBldrObj.setParameterizedNamedSql(JSON.parse(textAreacontent.value));
                        break;
                    case 'parameter':
                        _this.qryBldrObj.setParameterizedSql(JSON.parse(textAreacontent.value));
                        break;
                    case 'sql':
                        _this.qryBldrObj.setRulesFromSql(textAreacontent.value, true);
                        break;
                    default:
                        break;
                }
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
        _this.dialogOpen = function () {
            var dlgContentElement = document.getElementById('content-area');
            var errorElem = document.getElementById('dlgSpan');
            if (dlgContentElement && _this.currentvalue) {
                dlgContentElement.value = _this.currentvalue.value;
                _this.dialogInstance.header = _this.dialogHeader;
                errorElem.style.visibility = 'hidden';
                if (errorElem.classList.contains("error")) {
                    errorElem.classList.remove("error");
                }
            }
        };
        _this.onSelect = function (args) {
            var validRule = _this.qryBldrObj.getValidRules(_this.qryBldrObj.rule);
            switch (args.item.text) {
                case 'Import Mongo Query':
                    var mongoQuery = JSON.parse(_this.qryBldrObj.getMongoQuery(validRule));
                    mongoQuery = JSON.stringify(mongoQuery, null, 4);
                    _this.currentvalue.value = mongoQuery;
                    _this.currentvalue.rule = 'mongo';
                    _this.dialogHeader = "Mongo Query";
                    _this.dialogInstance.show();
                    break;
                case 'Import Inline Sql':
                    _this.currentvalue.value = _this.qryBldrObj.getSqlFromRules(validRule);
                    _this.currentvalue.rule = 'sql';
                    _this.dialogHeader = "SQL";
                    _this.dialogInstance.show();
                    break;
                case 'Import Parameter Sql':
                    _this.currentvalue.value = JSON.stringify(_this.qryBldrObj.getParameterizedSql(validRule), null, 4);
                    _this.currentvalue.rule = 'parameter';
                    _this.dialogHeader = "Parameter SQL";
                    _this.dialogInstance.show();
                    break;
                default:
                    _this.currentvalue.value = JSON.stringify(_this.qryBldrObj.getParameterizedNamedSql(validRule), null, 4);
                    _this.currentvalue.rule = 'namedparameter';
                    _this.dialogHeader = "NamedParameter SQL";
                    _this.dialogInstance.show();
                    break;
            }
        };
        _this.columnData = [
            { field: "EmployeeID", label: "Employee ID", type: "number" },
            { field: "FirstName", label: "First Name", type: "string" },
            { field: "LastName", label: "Last Name", type: "string" },
            { field: "Age", label: "Age", type: "number" },
            { field: "IsDeveloper", label: "Is Developer", type: "boolean" },
            { field: "PrimaryFramework", label: "Primary Framework", type: "string", template: frameworkTemplate },
            { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy" },
            { field: "Country", label: "Country", type: "string" },
        ];
        _this.importRules = {
            condition: "and",
            rules: [
                { label: "First Name", field: "FirstName", type: "string", operator: "startswith", value: "Andre" },
                { label: "Last Name", field: "LastName", type: "string", operator: "in", value: ['Davolio', 'Buchanan'] },
                { label: "Age", field: "Age", type: "number", operator: "greaterthan", value: 29 },
                {
                    condition: "or", rules: [
                        { label: "Is Developer", field: "IsDeveloper", type: "boolean", operator: "equal", value: true },
                        { label: "Primary Framework", field: "PrimaryFramework", type: "string", operator: "equal", value: "React" }
                    ]
                },
                { label: "Hire Date", field: "HireDate", type: "date", operator: "between", value: ["11/22/2023", "11/30/2023"] },
            ],
        };
        return _this;
    }
    Template.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "top-right-element" },
                    React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { id: "element", items: this.items, cssClass: 'e-caret-hide', select: this.onSelect }, "Import")),
                React.createElement("div", { className: 'col-lg-12 control-section' },
                    React.createElement("div", { className: "App" },
                        React.createElement(ej2_react_popups_1.DialogComponent, { id: 'dialog', width: '700px', height: '420px', isModal: true, animationSettings: this.animationSettings, header: "JSON", visible: false, beforeOpen: this.dialogOpen, closeOnEscape: false, showCloseIcon: true, buttons: this.buttons, ref: function (dialog) { return _this.dialogInstance = dialog; } },
                            React.createElement("div", null, this.dialogContent()))),
                    React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", dataSource: data_source_1.employeeData, columns: this.columnData, rule: this.importRules, ref: function (scope) { _this.qryBldrObj = scope; }, showButtons: { lockGroup: true }, ruleChange: this.updateRule }),
                    React.createElement("div", { className: "e-query-preview" },
                        React.createElement(ej2_react_navigations_1.TabComponent, { id: 'defaultTab', ref: function (scope) { _this.tabObj = scope; }, selected: this.changeTab, created: this.tabCreated },
                            React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headertext[0], content: this.SQLTemplate }),
                                React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headertext[1], content: this.MongoDBTemplate })))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the Query Builder component by showing different types of queries such as SQL and MongoDB . The query preview can be changed using the tab component. Queries can be imported to the Query Builder using the import dropdown button.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "In this demo, Query Builder features  include exporting and importing the query as an SQL query and MongoDB queries. MongoDB Query Builder is a tool that allows users to search for error logs in a MongoDB database. It provides a user-friendly interface for constructing and executing queries and allows users to filter, sort, and export the results for further analysis."),
                React.createElement("p", null, "The following methods were used in this sample to perform mongo and SQL query related changes."),
                React.createElement("ul", null,
                    React.createElement("li", null, "setMongoQuery"),
                    React.createElement("li", null, "getMongoQuery"),
                    React.createElement("li", null, "setParameterizedSQL"),
                    React.createElement("li", null, "getParameterizedSQL"),
                    React.createElement("li", null, "setParameterizedNamedSQL"),
                    React.createElement("li", null, "getParameterizedNamedSQL")),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
