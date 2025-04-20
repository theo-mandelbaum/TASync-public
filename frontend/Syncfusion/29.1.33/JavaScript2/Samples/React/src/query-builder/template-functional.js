"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var util_1 = require("./util");
var CodeMirror = require("codemirror");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var elem;
    var dropDownObj = (0, react_1.useRef)(null);
    var boxObj = (0, react_1.useRef)(null);
    var qryBldrObj = (0, react_1.useRef)(null);
    var tabObj = (0, react_1.useRef)(null);
    var checked;
    var headertext = [
        { text: "CEL" },
        { text: "SpEL" }
    ];
    var spELQuery = '';
    var currentIndex = 0;
    var content;
    var filter = [
        {
            field: "Category",
            label: "Category",
            type: "string",
        },
        {
            field: "PaymentMode",
            label: "Payment Mode",
            type: "string",
            template: {
                create: function () {
                    elem = document.createElement("input");
                    elem.setAttribute("type", "text");
                    return elem;
                },
                destroy: function (args) {
                    dropDownObj.current = (0, ej2_base_1.getComponent)(document.getElementById(args.elementId), "dropdownlist");
                    if (dropDownObj.current) {
                        dropDownObj.current.destroy();
                    }
                },
                write: function (args) {
                    var ds = [
                        "Cash",
                        "Debit Card",
                        "Credit Card",
                        "Net Banking",
                        "Wallet",
                    ];
                    dropDownObj.current = new ej2_react_dropdowns_1.DropDownList({
                        dataSource: ds,
                        value: args.values ? args.values : ds[0],
                        change: function (e) {
                            qryBldrObj.current.notifyChange(e.itemData.value, e.element);
                        },
                    });
                    dropDownObj.current.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not Equal", value: "notequal" },
            ],
        },
        {
            field: "TransactionType",
            label: "Transaction Type",
            type: "boolean",
            template: {
                create: function () {
                    elem = document.createElement("input");
                    elem.setAttribute("type", "checkbox");
                    return elem;
                },
                destroy: function (args) {
                    (0, ej2_base_1.getComponent)(document.getElementById(args.elementId), "checkbox").destroy();
                },
                write: function (args) {
                    checked = args.values === "IsExpensive" ? true : false;
                    boxObj.current = new ej2_react_buttons_1.CheckBox({
                        label: "Is Expensive",
                        checked: checked,
                        change: function (e) {
                            qryBldrObj.current.notifyChange(e.checked ? "expensive" : "income", e.event.target);
                        },
                    });
                    boxObj.current.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not Equal", value: "notequal" },
            ],
        },
        { field: "Description", label: "Description", type: "string" },
        { field: "Date", label: "Date", type: "date" },
        {
            field: "Amount",
            label: "Amount",
            type: "number",
            template: {
                create: function () {
                    elem = document.createElement("div");
                    elem.setAttribute("class", "ticks_slider");
                    return elem;
                },
                destroy: function (args) {
                    (0, ej2_base_1.getComponent)(document.getElementById(args.elementId), "slider").destroy();
                },
                write: function (args) {
                    var slider = new ej2_react_inputs_1.Slider({
                        value: args.values,
                        min: 0,
                        max: 100,
                        type: "MinRange",
                        tooltip: { isVisible: true, placement: "Before", showOn: "Hover" },
                        change: function (e) {
                            if (e.isInteracted) {
                                qryBldrObj.current.notifyChange(e.value, args.elements);
                            }
                        },
                    });
                    slider.appendTo("#" + args.elements.id);
                },
            },
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Not equal", value: "notequal" },
                { key: "Greater than", value: "greaterthan" },
                { key: "Less than", value: "lessthan" },
                { key: "Less than or equal", value: "lessthanorequal" },
                { key: "Greater than or equal", value: "greaterthanorequal" },
            ],
        },
    ];
    // Handler used to reposition the tooltip on page scroll
    var onScroll = function () {
        var tooltip = document.getElementsByClassName("e-handle e-control e-tooltip");
        var i;
        var len = tooltip.length, tooltipObj;
        for (i = 0; i < len; i++) {
            tooltipObj = tooltip[i].ej2_instances[0];
            tooltipObj.refresh(tooltipObj.element);
        }
    };
    var importRules = {
        condition: "and",
        rules: [
            {
                label: "Category",
                field: "Category",
                type: "string",
                operator: "in",
                value: ["Clothing"],
            },
            {
                condition: "or",
                rules: [
                    {
                        label: "TransactionType",
                        field: "TransactionType",
                        type: "boolean",
                        operator: "equal",
                        value: "Income",
                    },
                    {
                        label: "PaymentMode",
                        field: "PaymentMode",
                        type: "string",
                        operator: "equal",
                        value: "Cash",
                    },
                ],
            },
            {
                label: "Amount",
                field: "Amount",
                type: "number",
                operator: "equal",
                value: 10,
            },
        ],
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById("right-pane"))) {
        document.getElementById("right-pane").addEventListener("scroll", onScroll);
    }
    var CELTemplate = function () {
        return (React.createElement("div", { className: "preview-content", onClick: handleMouseEnter, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
            React.createElement("div", { className: "e-preview-options" },
                React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: copyClipboard },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                        React.createElement("div", { className: "e-icons copycode" })))),
            React.createElement("textarea", { className: "e-cel-content", style: { display: 'none' } })));
    };
    var SpELTemplate = function () {
        return (React.createElement("div", { className: "preview-content", onClick: handleMouseEnter, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
            React.createElement("div", { className: "e-preview-options" },
                React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: copyClipboard },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                        React.createElement("div", { className: "e-icons copycode" })))),
            React.createElement("textarea", { className: "e-spel-content", style: { display: 'none' } })));
    };
    var handleMouseEnter = function () {
        var elem = document.getElementsByClassName("copy-tooltip");
        for (var i = 0; i < elem.length; i++) {
            if (tabObj.current.selectedItem == i) {
                elem[i].style.display = 'block';
            }
        }
    };
    var handleMouseLeave = function () {
        var elem = document.getElementsByClassName("copy-tooltip");
        for (var i = 0; i < elem.length; i++) {
            if (tabObj.current.selectedItem == i) {
                elem[i].style.display = 'none';
            }
        }
    };
    var copyClipboard = function (args) {
        navigator.clipboard.writeText(content);
        setTimeout(function () {
            (0, ej2_base_1.getComponent)(args.target.closest('.e-tooltip'), 'tooltip').close();
        }, 1000);
    };
    var updateCELContentTemplate = function () {
        var codeMirrorEditor;
        var allRules = qryBldrObj.current.getValidRules();
        var celQuery = '';
        celQuery = (0, util_1.getCELQuery)(allRules, celQuery);
        content = celQuery;
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-cel-content')[0], {
            readOnly: true,
            theme: 'default',
            lineWrapping: true,
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-cel-content')[0].textContent = content;
            document.getElementsByClassName('e-cel-content')[0].style.display = 'block';
        }
    };
    var updateSpCELContentTemplate = function () {
        var codeMirrorEditor;
        spELQuery = '';
        var allRules = qryBldrObj.current.getValidRules();
        content = (0, util_1.getSpELQuery)(allRules);
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-spel-content')[0], {
            readOnly: true,
            theme: 'default',
            lineWrapping: true,
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-spel-content')[0].textContent = content;
            document.getElementsByClassName('e-spel-content')[0].style.display = 'block';
        }
    };
    var tabCreated = function () {
        setTimeout(function () {
            updateCELContentTemplate();
        }, 100);
    };
    var updateContentTemplate = function () {
        switch (currentIndex) {
            case 0:
                updateCELContentTemplate();
                break;
            case 1:
                updateSpCELContentTemplate();
                break;
        }
    };
    var changeTab = function (args) {
        currentIndex = args.selectedIndex;
        setTimeout(function () {
            updateContentTemplate();
        }, 100);
    };
    /* custom code start */
    var clearHighlight = function () {
        var codeMirrorElem = document.getElementsByClassName('e-query-preview')[0].querySelectorAll('.CodeMirror');
        for (var i = codeMirrorElem.length - 1; i >= 0; i--) {
            codeMirrorElem[i].remove();
        }
    };
    /* custom code end */
    var updateRule = function () {
        updateContentTemplate();
    };
    return (React.createElement("div", { className: "control-pane querybuilder-pane" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { dataSource: data_source_1.expenseData, columns: filter, width: "100%", rule: importRules, ref: qryBldrObj, ruleChange: updateRule }),
            React.createElement("div", { className: "e-query-preview" },
                React.createElement(ej2_react_navigations_1.TabComponent, { id: 'defaultTab', ref: tabObj, selected: changeTab, created: tabCreated },
                    React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: CELTemplate }),
                        React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: SpELTemplate }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the integration of the Dropdown List and Slider components as templates in the Query Builder component and also showing the different types of queries such as CEL and SpEL. The query preview can be changed using the tab component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                " ",
                "This sample illustrates the way to integrate drop-down components, Slider, Checkbox with Query Builder. The applicable types of templates are:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "DropDownList")),
                React.createElement("li", null,
                    React.createElement("code", null, "AutoComplete")),
                React.createElement("li", null,
                    React.createElement("code", null, "CheckBox")),
                React.createElement("li", null,
                    React.createElement("code", null, "Slider"))),
            React.createElement("p", null,
                " ",
                "In this demo queries are exported and imported in CEL and SpEL formats. For Common Expression Language (CEL) output, use the \"cel\" format. CEL is used for validating data. For Spring Expression Language (SpEL) output, use the \"spel\" format. The Spring Expression Language (SpEL) is a powerful expression language that supports querying and manipulating an object graph at runtime.",
                " "),
            React.createElement("p", null,
                "More information about Query Builder can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = Template;
