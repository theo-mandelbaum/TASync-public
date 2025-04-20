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
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var util_1 = require("./util");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var CodeMirror = require("codemirror");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.headertext = [
            { text: "CEL" },
            { text: "SpEL" }
        ];
        _this.spELQuery = '';
        _this.currentIndex = 0;
        _this.txtAreaElem = document.getElementById('ruleContent');
        _this.filter = [
            {
                field: 'Category', label: 'Category', type: 'string',
            },
            {
                field: 'PaymentMode', label: 'Payment Mode', type: 'string', template: {
                    create: function () {
                        _this.elem = document.createElement('input');
                        _this.elem.setAttribute('type', 'text');
                        return _this.elem;
                    },
                    destroy: function (args) {
                        _this.dropDownObj = (0, ej2_base_1.getComponent)(document.getElementById(args.elementId), 'dropdownlist');
                        if (_this.dropDownObj) {
                            _this.dropDownObj.destroy();
                        }
                    },
                    write: function (args) {
                        var ds = ['Cash', 'Debit Card', 'Credit Card', 'Net Banking', 'Wallet'];
                        _this.dropDownObj = new ej2_react_dropdowns_1.DropDownList({
                            dataSource: ds,
                            value: args.values ? args.values : ds[0],
                            change: function (e) {
                                _this.qryBldrObj.notifyChange(e.itemData.value, e.element);
                            }
                        });
                        _this.dropDownObj.appendTo('#' + args.elements.id);
                    }
                },
                operators: [
                    { key: 'Equal', value: 'equal' },
                    { key: 'Not Equal', value: 'notequal' }
                ]
            },
            {
                field: 'TransactionType', label: 'Transaction Type', type: 'boolean', template: {
                    create: function () {
                        _this.elem = document.createElement('input');
                        _this.elem.setAttribute('type', 'checkbox');
                        return _this.elem;
                    },
                    destroy: function (args) {
                        (0, ej2_base_1.getComponent)(document.getElementById(args.elementId), 'checkbox').destroy();
                    },
                    write: function (args) {
                        _this.checked = args.values === 'IsExpensive' ? true : false;
                        _this.boxObj = new ej2_react_buttons_1.CheckBox({
                            label: 'Is Expensive',
                            checked: _this.checked,
                            change: function (e) {
                                _this.qryBldrObj.notifyChange(e.checked ? 'expensive' : 'income', e.event.target);
                            }
                        });
                        _this.boxObj.appendTo('#' + args.elements.id);
                    }
                },
                operators: [
                    { key: 'Equal', value: 'equal' },
                    { key: 'Not Equal', value: 'notequal' }
                ]
            },
            { field: 'Description', label: 'Description', type: 'string' },
            { field: 'Date', label: 'Date', type: 'date' },
            {
                field: 'Amount', label: 'Amount', type: 'number', template: {
                    create: function () {
                        _this.elem = document.createElement('div');
                        _this.elem.setAttribute('class', 'ticks_slider');
                        return _this.elem;
                    },
                    destroy: function (args) {
                        (0, ej2_base_1.getComponent)(document.getElementById(args.elementId), 'slider').destroy();
                    },
                    write: function (args) {
                        var slider = new ej2_react_inputs_1.Slider({
                            value: args.values,
                            min: 0,
                            max: 100,
                            type: 'MinRange',
                            tooltip: { isVisible: true, placement: 'Before', showOn: 'Hover' },
                            change: function (e) {
                                if (e.isInteracted) {
                                    _this.qryBldrObj.notifyChange(e.value, args.elements);
                                }
                            }
                        });
                        slider.appendTo('#' + args.elements.id);
                    }
                },
                operators: [
                    { key: 'Equal', value: 'equal' },
                    { key: 'Not equal', value: 'notequal' },
                    { key: 'Greater than', value: 'greaterthan' },
                    { key: 'Less than', value: 'lessthan' },
                    { key: 'Less than or equal', value: 'lessthanorequal' },
                    { key: 'Greater than or equal', value: 'greaterthanorequal' }
                ]
            }
        ];
        _this.importRules = {
            'condition': 'and',
            'rules': [{
                    'label': 'Category',
                    'field': 'Category',
                    'type': 'string',
                    'operator': 'in',
                    'value': ['Clothing']
                },
                {
                    'condition': 'or',
                    'rules': [{
                            'label': 'TransactionType',
                            'field': 'TransactionType',
                            'type': 'boolean',
                            'operator': 'equal',
                            'value': 'Income'
                        },
                        {
                            'label': 'PaymentMode',
                            'field': 'PaymentMode',
                            'type': 'string',
                            'operator': 'equal',
                            'value': 'Cash'
                        }]
                }, {
                    'label': 'Amount',
                    'field': 'Amount',
                    'type': 'number',
                    'operator': 'equal',
                    'value': 10
                }
            ]
        };
        _this.CELTemplate = function () {
            return (React.createElement("div", { className: "preview-content", onClick: _this.handleMouseEnter, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave },
                React.createElement("div", { className: "e-preview-options" },
                    React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: _this.copyClipboard },
                        React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                            React.createElement("div", { className: "e-icons copycode" })))),
                React.createElement("textarea", { className: "e-cel-content", style: { display: 'none' } })));
        };
        _this.SpELTemplate = function () {
            return (React.createElement("div", { className: "preview-content", onClick: _this.handleMouseEnter, onMouseEnter: _this.handleMouseEnter, onMouseLeave: _this.handleMouseLeave },
                React.createElement("div", { className: "e-preview-options" },
                    React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: _this.copyClipboard },
                        React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                            React.createElement("div", { className: "e-icons copycode" })))),
                React.createElement("textarea", { className: "e-spel-content", style: { display: 'none' } })));
        };
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
        _this.copyClipboard = function (args) {
            navigator.clipboard.writeText(_this.content);
            setTimeout(function () {
                (0, ej2_base_1.getComponent)(args.target.closest('.e-tooltip'), 'tooltip').close();
            }, 1000);
        };
        _this.updateCELContentTemplate = function () {
            var codeMirrorEditor;
            var allRules = _this.qryBldrObj.getValidRules();
            var celQuery = '';
            celQuery = (0, util_1.getCELQuery)(allRules, celQuery);
            _this.content = celQuery;
            /* custom code start */
            _this.clearHighlight();
            codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-cel-content')[0], {
                readOnly: true,
                theme: 'default',
                lineWrapping: true,
            });
            codeMirrorEditor.setValue(_this.content);
            /* custom code end */
            if (!codeMirrorEditor) {
                document.getElementsByClassName('e-cel-content')[0].textContent = _this.content;
                document.getElementsByClassName('e-cel-content')[0].style.display = 'block';
            }
        };
        _this.updateSpCELContentTemplate = function () {
            var codeMirrorEditor;
            _this.spELQuery = '';
            var allRules = _this.qryBldrObj.getValidRules();
            _this.content = (0, util_1.getSpELQuery)(allRules);
            /* custom code start */
            _this.clearHighlight();
            codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-spel-content')[0], {
                readOnly: true,
                theme: 'default',
                lineWrapping: true,
            });
            codeMirrorEditor.setValue(_this.content);
            /* custom code end */
            if (!codeMirrorEditor) {
                document.getElementsByClassName('e-spel-content')[0].textContent = _this.content;
                document.getElementsByClassName('e-spel-content')[0].style.display = 'block';
            }
        };
        _this.tabCreated = function () {
            setTimeout(function () {
                this.updateCELContentTemplate();
            }, 100);
        };
        _this.updateContentTemplate = function () {
            switch (_this.currentIndex) {
                case 0:
                    _this.updateCELContentTemplate();
                    break;
                case 1:
                    _this.updateSpCELContentTemplate();
                    break;
            }
        };
        _this.changeTab = function (args) {
            _this.currentIndex = args.selectedIndex;
            setTimeout(function () {
                this.updateContentTemplate();
            }, 100);
        };
        /* custom code start */
        _this.clearHighlight = function () {
            var codeMirrorElem = document.getElementsByClassName('e-query-preview')[0].querySelectorAll('.CodeMirror');
            for (var i = codeMirrorElem.length - 1; i >= 0; i--) {
                codeMirrorElem[i].remove();
            }
        };
        return _this;
    }
    Template.prototype.changeValue = function () {
        this.txtAreaElem = document.getElementById('ruleContent');
        this.validRule = this.qryBldrObj.getValidRules(this.qryBldrObj.rule);
        if (this.radioButton.checked) {
            this.txtAreaElem.value = this.qryBldrObj.getSqlFromRules(this.validRule);
        }
        else {
            this.txtAreaElem.value = JSON.stringify(this.validRule, null, 4);
        }
    };
    Template.prototype.onCreated = function () {
        document.getElementById('ruleContent').value = JSON.stringify(this.qryBldrObj.getValidRules(this.qryBldrObj.rule), null, 4);
    };
    // Handler used to reposition the tooltip on page scroll
    Template.prototype.onScroll = function () {
        var tooltip = document.getElementsByClassName('e-handle e-control e-tooltip');
        var i;
        var len = tooltip.length, tooltipObj;
        for (i = 0; i < len; i++) {
            tooltipObj = tooltip[i].ej2_instances[0];
            tooltipObj.refresh(tooltipObj.element);
        }
    };
    /* custom code end */
    Template.prototype.updateRule = function () {
        this.updateContentTemplate();
    };
    Template.prototype.render = function () {
        var _this = this;
        if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById('right-pane'))) {
            document.getElementById('right-pane').addEventListener('scroll', this.onScroll);
        }
        return (React.createElement("div", { className: 'control-pane querybuilder-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { dataSource: data_source_1.expenseData, columns: this.filter, width: '100%', rule: this.importRules, ref: function (scope) { _this.qryBldrObj = scope; }, created: this.onCreated.bind(this), ruleChange: this.updateRule.bind(this) }),
                React.createElement("div", { className: "e-query-preview" },
                    React.createElement(ej2_react_navigations_1.TabComponent, { id: 'defaultTab', ref: function (scope) { _this.tabObj = scope; }, selected: this.changeTab, created: this.tabCreated },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headertext[0], content: this.CELTemplate }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: this.headertext[1], content: this.SpELTemplate }))))),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "This sample demonstrates the integration of DropdownList, Slider components as Templates in the Query Builder component with showing different types of queries such as CEL and SpEL. The query preview can be changed using the tab component.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, " This sample illustrates the way to integrate drop-down components, Slider, Checkbox with Query Builder. The applicable types of templates are:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "DropDownList")),
                    React.createElement("li", null,
                        React.createElement("code", null, "AutoComplete")),
                    React.createElement("li", null,
                        React.createElement("code", null, "CheckBox")),
                    React.createElement("li", null,
                        React.createElement("code", null, "Slider"))),
                React.createElement("p", null, " In this demo queries are exported and imported in CEL and SpEL formats. For Common Expression Language (CEL) output, use the \"cel\" format. CEL is used for validating data. For Spring Expression Language (SpEL) output, use the \"spel\" format. The Spring Expression Language (SpEL) is a powerful expression language that supports querying and manipulating an object graph at runtime."),
                React.createElement("p", null,
                    "More information about Query Builder can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                    "."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
