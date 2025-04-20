"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_querybuilder_1 = require("@syncfusion/ej2-react-querybuilder");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./query-preview.css");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var data_source_1 = require("./data-source");
var CodeMirror = require("codemirror");
ej2_react_querybuilder_1.QueryBuilderComponent.Inject(ej2_react_querybuilder_1.QueryLibrary);
var allowDragAndDrop = true;
var headertext = [
    { text: "SQL" },
    { text: "JSON" }
];
var queryType = 'inline';
var currentIndex = 0;
var content;
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
var AllowDragAndDrop = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var qryBldrObj = (0, react_1.useRef)(null);
    var tabObj = (0, react_1.useRef)(null);
    var columnData = [
        { field: "EmployeeID", label: "Employee ID", type: "number" },
        { field: "FirstName", label: "First Name", type: "string" },
        { field: "LastName", label: "Last Name", type: "string" },
        { field: "Age", label: "Age", type: "number" },
        { field: "IsDeveloper", label: "Is Developer", type: "boolean" },
        { field: "PrimaryFramework", label: "Primary Framework", type: "string", template: frameworkTemplate },
        { field: "HireDate", label: "Hire Date", type: "date", format: "MM/dd/yyyy" },
        { field: "Country", label: "Country", type: "string" },
    ];
    var importRules = {
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
    var SQLTemplate = function () {
        var isInline = queryType === "inline";
        var isParameter = queryType === "parameter";
        var isNamedParameter = queryType === "namedParameter";
        return (React.createElement("div", { className: "preview-content", onClick: handleMouseEnter, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
            React.createElement("div", { className: "e-preview-options" },
                React.createElement("label", null, "Format Info:"),
                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { cssClass: "e-radio-option", change: change, label: "Inline", checked: isInline, name: "state", value: "Inline" }),
                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { cssClass: "e-radio-option", checked: isParameter, change: change, label: "Parameter", name: "state", value: "Parameter" }),
                React.createElement(ej2_react_buttons_1.RadioButtonComponent, { cssClass: "e-radio-option", checked: isNamedParameter, change: change, label: "Named Parameter", name: "state", value: "NamedParameter" }),
                React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: copyClipboard },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                        React.createElement("div", { className: "e-icons copycode" })))),
            React.createElement("textarea", { className: "e-sql-content", style: { display: 'none' } })));
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
    var JsonTemplate = function () {
        return (React.createElement("div", { className: "preview-content", onClick: handleMouseEnter, onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave },
            React.createElement("div", { className: "e-preview-options" },
                React.createElement("div", { className: "copy-tooltip", style: { display: 'none' }, onClick: copyClipboard },
                    React.createElement(ej2_react_popups_1.TooltipComponent, { opensOn: "Click", content: "Copied to clipboard" },
                        React.createElement("div", { className: "e-icons copycode" })))),
            React.createElement("textarea", { className: "e-json-content", style: { display: 'none' } })));
    };
    var tabCreated = function () {
        setTimeout(function () {
            updateSQLContentTemplate();
        }, 100);
    };
    var changeTab = function (args) {
        currentIndex = args.selectedIndex;
        setTimeout(function () {
            updateContentTemplate();
        }, 100);
    };
    var updateContentTemplate = function () {
        switch (currentIndex) {
            case 0:
                updateSQLContentTemplate();
                break;
            case 1:
                updateJsonContentTemplate();
                break;
        }
    };
    var updateSQLContentTemplate = function () {
        var codeMirrorEditor;
        content = updateSQLContent();
        /* custom code start */
        clearHighlight();
        codeMirrorEditor = CodeMirror.fromTextArea(document.getElementsByClassName('e-sql-content')[0], {
            readOnly: true,
            lineWrapping: true,
            theme: 'default', // Set your desired theme here
        });
        codeMirrorEditor.setValue(content);
        /* custom code end */
        if (!codeMirrorEditor) {
            document.getElementsByClassName('e-sql-content')[0].textContent = content;
            document.getElementsByClassName('e-sql-content')[0].style.display = 'block';
        }
    };
    var updateJsonContentTemplate = function () {
        var codeMirrorEditor;
        var validRule = qryBldrObj.current.getValidRules(qryBldrObj.current.rule);
        content = JSON.stringify(validRule, null, 4);
        /* custom code start */
        clearHighlight();
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
    /* custom code start */
    var clearHighlight = function () {
        var codeMirrorElem = document.getElementsByClassName('e-query-preview')[0].querySelectorAll('.CodeMirror');
        for (var i = codeMirrorElem.length - 1; i >= 0; i--) {
            codeMirrorElem[i].remove();
        }
    };
    /* custom code end */
    var change = function (args) {
        queryType = args.value.toLowerCase();
        updateSQLContentTemplate();
    };
    var updateSQLContent = function () {
        var content;
        var qbrule = qryBldrObj.current.getValidRules(qryBldrObj.current.rule);
        switch (queryType) {
            case 'inline':
                content = qryBldrObj.current.getSqlFromRules(qbrule);
                ;
                break;
            case 'parameter':
                content = convertParameterSql(qbrule);
                break;
            default:
                content = convertNamedParameterSql(qbrule);
                break;
        }
        return content;
    };
    var convertParameterSql = function (qbrule) {
        var content = JSON.stringify(qryBldrObj.current.getParameterizedSql(qbrule), null, 4);
        return content;
    };
    var convertNamedParameterSql = function (qbrule) {
        var content = JSON.stringify(qryBldrObj.current.getParameterizedNamedSql(qbrule), null, 4);
        return content;
    };
    var updateRule = function () {
        updateContentTemplate();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: "App" }),
                React.createElement(ej2_react_querybuilder_1.QueryBuilderComponent, { id: "querybuilder", dataSource: data_source_1.employeeData, columns: columnData, rule: importRules, ref: qryBldrObj, ruleChange: updateRule, allowDragAndDrop: allowDragAndDrop }),
                React.createElement("div", { className: "e-query-preview" },
                    React.createElement(ej2_react_navigations_1.TabComponent, { id: 'defaultTab', ref: tabObj, selected: changeTab, created: tabCreated },
                        React.createElement(ej2_react_navigations_1.TabItemsDirective, null,
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[0], content: SQLTemplate }),
                            React.createElement(ej2_react_navigations_1.TabItemDirective, { header: headertext[1], content: JsonTemplate })))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This sample demonstrates the drag and drop support of the Query Builder component.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null, "In this demo, the Query Builder includes a drag-and-drop feature that allows you to move rules or groups to different positions. You can enable or disable this feature using the 'allowDragAndDrop' property."),
            React.createElement("p", null,
                "More information about Query Builder can be found in this",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/query-builder/getting-started/' }, "documentation section"),
                "."))));
};
exports.default = AllowDragAndDrop;
