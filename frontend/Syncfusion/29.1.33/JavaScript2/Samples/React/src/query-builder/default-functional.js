"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./default.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var base_1 = require("@syncfusion/ej2/base");
var CodeMirror = require("codemirror");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var qbObj = (0, react_1.useRef)(null);
    var content;
    var txtAreaElem = (0, react_1.useRef)(null);
    var dialogInstance = (0, react_1.useRef)(null);
    var animationSettings;
    var createdControl = function () {
        if (ej2_base_1.Browser.isDevice) {
            qbObj.current.summaryView = true;
        }
        var codeMirrorEditor;
        var validRule = qbObj.current.getValidRules(qbObj.current.rule);
        content = JSON.stringify(validRule, null, 4);
        txtAreaElem.current.value = content;
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0], {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(content);
    };
    var updateRule = function () {
        var codeMirrorEditor;
        var validRule = qbObj.current.getValidRules(qbObj.current.rule);
        content = JSON.stringify(validRule, null, 4);
        txtAreaElem.current.value = content;
        /* custom code start */
        document.querySelector('.e-query-preview .preview-content').childNodes[1].remove();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-json-content')[0], {
            mode: 'javascript',
            readOnly: true,
            theme: 'default' // Set your desired theme here
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-json-content')[0].textContent = content;
            document.getElementsByClassName('e-json-content')[0].style.display = 'block';
        }
    };
    var columnData = [
        {
            field: "EmployeeID",
            label: "EmployeeID",
            type: "number",
            operators: [
                { key: "Equal", value: "equal" },
                { key: "Greater than", value: "greaterthan" },
                { key: "Less than", value: "lessthan" },
            ],
        },
        { field: "FirstName", label: "FirstName", type: "string" },
        {
            field: "TitleOfCourtesy",
            label: "Title Of Courtesy",
            type: "boolean",
            values: ["Mr.", "Mrs."],
        },
        { field: "Title", label: "Title", type: "string" },
        {
            field: "HireDate",
            label: "HireDate",
            type: "date",
            format: "dd/MM/yyyy",
        },
        { field: "Country", label: "Country", type: "string" },
        { field: "City", label: "City", type: "string" },
    ];
    var importRules = {
        condition: "and",
        rules: [
            {
                label: "EmployeeID",
                field: "EmployeeID",
                type: "number",
                operator: "equal",
                value: 1,
            },
            {
                label: "Title",
                field: "Title",
                type: "string",
                operator: "equal",
                value: "Sales Manager",
            },
        ],
    };
    function handleClick() {
        dialogInstance.show();
    }
    var buttons = [
        {
            buttonModel: {
                content: 'Cancel',
                cssClass: 'e-flat',
            },
            click: function () {
                dialogInstance.hide();
            },
        },
        {
            buttonModel: {
                content: 'Import',
                cssClass: 'e-flat',
                isPrimary: true,
            },
            click: function () {
                importQuery();
            },
        },
    ];
    var importQuery = function () {
        try {
            var textAreacontent = document.getElementById('json-content-area');
            qbObj.current.setRules(JSON.parse(textAreacontent.value));
            updateRule();
            dialogInstance.hide();
        }
        catch (error) {
            var errorElem = document.getElementById('dlgSpan');
            if (!errorElem.classList.contains("error")) {
                errorElem.style.visibility = 'visible';
                errorElem.classList.add("error");
            }
        }
    };
    var dialogContent = function () {
        return (React.createElement("div", null,
            React.createElement("textarea", { className: "json-content-area", id: "json-content-area" }),
            React.createElement("span", { id: "dlgSpan", style: { visibility: 'hidden' } }, "Invalid Query")));
    };
    var dialogOpen = function () {
        var dlgContentElement = document.getElementById('json-content-area');
        var errorElem = document.getElementById('dlgSpan');
        if (dlgContentElement) {
            var validRule = qbObj.current.getValidRules(qbObj.current.rule);
            content = JSON.stringify(validRule, null, 4);
            dlgContentElement.value = content;
            errorElem.style.visibility = 'hidden';
            if (errorElem.classList.contains("error")) {
                errorElem.classList.remove("error");
            }
        }
    };
    var copyClipboard = function (args) {
        navigator.clipboard.writeText(content);
        setTimeout(function () {
            (0, base_1.getComponent)(args.target.closest('.e-tooltip'), 'tooltip').close();
        }, 1000);
    };
    var handleMouseEnter = function () {
        var elem = document.getElementsByClassName("copy-tooltip");
        elem[0].style.display = 'block';
    };
    var handleMouseLeave = function () {
        var elem = document.getElementsByClassName("copy-tooltip");
        elem[0].style.display = 'none';
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "top-right-button" },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: "e-btn e-custom-btn", id: "json-btn", onClick: handleClick.bind(_this) }, "Import JSON")),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 control-section" },
                    React.createElement("div", { className: "App" },
                        React.createElement(ej2_react_popups_1.DialogComponent, { id: 'dialog', width: '700px', height: '420px', isModal: true, animationSettings: animationSettings, header: "JSON", visible: false, beforeOpen: dialogOpen, closeOnEscape: false, showCloseIcon: true, buttons: buttons, ref: function (dialog) { return dialogInstance = dialog; } },
                            React.createElement("div", null, dialogContent()))),
                    React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { dataSource: data_source_1.employeeData, columns: columnData, rule: importRules, ruleChange: updateRule, created: createdControl, ref: qbObj }),
                    React.createElement("div", { className: "e-query-preview", onClick: handleMouseEnter, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
                        React.createElement("div", { style: { border: 'none', width: '100%' } },
                            React.createElement("label", { style: { padding: '10px' } }, "JSON"),
                            React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: copyClipboard },
                                React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                                    React.createElement("div", { className: "e-icons copycode" })))),
                        React.createElement("div", { className: "preview-content" },
                            React.createElement("textarea", { className: 'e-json-content', title: "JSON Content", ref: txtAreaElem })))))),
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
exports.default = Default;
