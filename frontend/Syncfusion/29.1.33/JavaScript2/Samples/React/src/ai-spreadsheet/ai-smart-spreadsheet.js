"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var datasource_1 = require("./datasource");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_interactive_chat_1 = require("@syncfusion/ej2-react-interactive-chat");
require("./smart-spreadsheet.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
function SmartSpreadsheet() {
    var spreadsheet;
    var sidebarObj;
    var prompts = [
        { prompt: '', response: '' }
    ];
    var aiInstance;
    var sheet = [
        {
            ranges: [{
                    dataSource: datasource_1.grossPay,
                    startCell: 'A3'
                },
            ],
            name: 'Gross Pay',
            rows: [{
                    cells: [{
                            value: 'Gross Pay Calculation',
                            style: {
                                fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#B3FFB3',
                                verticalAlign: 'middle'
                            }
                        }]
                },
                {
                    index: 3, cells: [{
                            index: 9, formula: '=B4+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 4, cells: [{
                            index: 9, formula: '=B5+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 5, cells: [{
                            index: 9, formula: '=B6+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 6, cells: [{
                            index: 9, formula: '=B7+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 7, cells: [{
                            index: 9, formula: '=B8+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 8, cells: [{
                            index: 9, formula: '=B9+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 9, cells: [{
                            index: 9, formula: '=B10+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 10, cells: [{
                            index: 9, formula: '=B11+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 11, cells: [{
                            index: 9, formula: '=B12+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 12, cells: [{
                            index: 9, formula: '=B13+6',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                },
                {
                    index: 13,
                    cells: [{
                            index: 7, value: 'Total Gross',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        },
                        {
                            index: 8, formula: '=Sum(I4:I13)', format: '$#,##0.00',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }, {
                            index: 9, formula: '=Sum(J4:J13)',
                            style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' }
                        }]
                }
            ],
            columns: [
                { width: 88, }, { width: 120 }, { width: 106 }, { width: 98 }, { width: 110 },
                { width: 110 }, { width: 110 }, { width: 98 }, { width: 130 }
            ]
        }
    ];
    function onCreate() {
        spreadsheet.merge('A1:I2');
        spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'A1:I13');
        spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A3:I13');
        spreadsheet.cellFormat({ backgroundColor: '#B3FFB3', fontWeight: 'bold' }, 'A3:I3');
        spreadsheet.numberFormat('$#,##0.00', 'H4:I13');
        spreadsheet.wrap('H3:I3');
        spreadsheet.addRibbonTabs([{
                header: { text: 'AI Assistant' }, content: [
                    {
                        text: 'Full Sheet Analysis', tooltipText: 'Full Sheet Analysis',
                        click: function () {
                            fullSheetAnalysis();
                        }
                    },
                    {
                        text: 'Validate', tooltipText: 'Validate formulae',
                        click: function () {
                            formulaValidate();
                        }
                    },
                    {
                        text: 'Generate Formula', tooltipText: 'Generate Formula',
                        click: function () {
                            generateFormula();
                        }
                    }
                ]
            }]);
        spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '9:00:00 AM', ignoreBlank: false }, 'E4:E13');
        spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '6:00:00 PM', ignoreBlank: false }, 'F4:F13');
        spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '10', ignoreBlank: false }, 'G4:G13');
        spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '250', ignoreBlank: false }, 'H4:H13');
        spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '300', ignoreBlank: false }, 'I4:I13');
    }
    function fullSheetAnalysis() {
        spreadsheet.saveAsJson().then(function (data) {
            var processedString = processDataSource(data);
            var query = 'Analyze the full data in this data. ' + processedString;
            var aiOutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: query }] });
            aiOutput.then(function (result) {
                result = markdownToPlainText(result);
                renderAssistView(result);
                sidebarObj.show();
            });
        });
    }
    function formulaValidate() {
        var selectedCell = spreadsheet.sheets[spreadsheet.activeSheetIndex].selectedRange;
        var isFormulaAvailable = false;
        if (!(0, ej2_base_1.isNullOrUndefined)(selectedCell)) {
            spreadsheet.getData(selectedCell).then(function (data) {
                var currentCells = Array.from(data.keys());
                var query = 'Validate the below formulae and provide me the problem in it. Strictly provide the data for each validated response in a flat JSON with fields `cell` to hold the spreadsheet cell value and `response` to hold the problem and solution.';
                for (var a = 0; a < currentCells.length; a++) {
                    var cellFormula = data.get(currentCells[a]).formula;
                    if (!(0, ej2_base_1.isNullOrUndefined)(cellFormula)) {
                        isFormulaAvailable = true;
                        query += 'Spreadsheet cell - ' + currentCells[a] + ' - Formula - ' + cellFormula + ' - ' + processString(cellFormula);
                    }
                }
                if (isFormulaAvailable) {
                    var aiOutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: query }] });
                    aiOutput.then(function (result) {
                        var cleanedResponseText = result.split('```json')[1].trim();
                        cleanedResponseText = cleanedResponseText.split("```")[0].trim();
                        var responseJson = JSON.parse(cleanedResponseText);
                        for (var a = 0; a < responseJson.length; a++) {
                            spreadsheet.updateCell({ notes: responseJson[a].response }, responseJson[a].cell);
                        }
                    });
                }
            });
        }
    }
    function generateFormula() {
        renderAssistViewForFormula();
        sidebarObj.show();
    }
    function renderAssistViewForFormula() {
        if (!(0, ej2_base_1.isNullOrUndefined)(aiInstance)) {
            aiInstance.promptRequest = promptHandler;
            aiInstance.prompts = prompts;
        }
    }
    function promptHandler(args) {
        var prompt = args.prompt;
        spreadsheet.saveAsJson().then(function (data) {
            var processedString = processDataSource(data);
            var query = prompt + '. Strictly provide the excel formula for the Excel sheet data which is provided as JSON below. /n' + processedString;
            var aiOutput = window.getAzureChatAIRequest({ messages: [{ role: 'user', content: query }] });
            aiOutput.then(function (result) {
                if (result) {
                    var cleanedResponseText = result.split('```excel')[1].trim();
                    cleanedResponseText = cleanedResponseText.split('```')[0].trim();
                    prompts.push({ prompt: prompt, response: cleanedResponseText });
                    aiInstance.prompts = prompts;
                }
            });
        });
    }
    function removeKeys(array, keysToRemove, cellsKeys) {
        array.forEach(function (obj) {
            keysToRemove.forEach(function (key) {
                if (key === 'cells') {
                    if (obj && obj.cells && obj.cells.length > 0) {
                        removeKeys(obj.cells, cellsKeys);
                    }
                }
                else {
                    if (obj && obj[key]) {
                        delete obj[key];
                    }
                }
            });
        });
        return array;
    }
    function processDataSource(data) {
        var dataSource = removeKeys(data.jsonObject.Workbook.sheets[spreadsheet.activeSheetIndex].rows, ['height', 'cells'], ['style', 'wrap', 'validation', 'colSpan', 'rowSpan']);
        var processedString = JSON.stringify(dataSource);
        return processedString.replaceAll('{}', null);
    }
    function renderAssistView(response) {
        if (!(0, ej2_base_1.isNullOrUndefined)(aiInstance)) {
            aiInstance.prompts = [{ prompt: '', response: response }];
        }
    }
    function processString(forumlaString) {
        var processedString = '';
        var regex = /\(([^)]+)\)/g;
        var matches = [];
        var match;
        while ((match = regex.exec(forumlaString)) !== null) {
            var text = match[1];
            matches = text.split(/[:+\-*=/]/).map(function (s) { return s.trim(); }).filter(function (s) { return s !== ''; });
        }
        if ((0, ej2_base_1.isNullOrUndefined)(matches) || matches.length <= 0) {
            matches = forumlaString.split(/[:+\-*=/]/).map(function (s) { return s.trim(); }).filter(function (s) { return s !== ''; });
        }
        if (matches.length > 0) {
            for (var i = 0; i < matches.length; i++) {
                var _a = cellAddressToIndexes(matches[i]), rowIndex = _a.rowIndex, columnIndex = _a.columnIndex;
                if (rowIndex != null && columnIndex != null) {
                    processedString += 'Value of the cell ' + matches[i] + ' is ' + (0, ej2_react_spreadsheet_1.getCell)(rowIndex, columnIndex, spreadsheet.sheets[spreadsheet.activeSheetIndex]).value + '/n';
                }
            }
        }
        return processedString;
    }
    function cellAddressToIndexes(cellAddress) {
        var match = cellAddress.match(/^([A-Z]+)(\d+)$/);
        if (!match) {
            var rowIndex_1 = null;
            var columnIndex_1 = null;
            return { rowIndex: rowIndex_1, columnIndex: columnIndex_1 };
        }
        var columnLetters = match[1];
        var rowNumber = parseInt(match[2], 10);
        var columnIndex = 0;
        for (var i = 0; i < columnLetters.length; i++) {
            columnIndex = columnIndex * 26 + (columnLetters.charCodeAt(i) - 'A'.charCodeAt(0));
        }
        var rowIndex = rowNumber - 1;
        return { rowIndex: rowIndex, columnIndex: columnIndex };
    }
    function markdownToPlainText(markdown) {
        markdown = markdown.replace(/^###### (.+)$/gm, '<h6>$1</h6>');
        markdown = markdown.replace(/^##### (.+)$/gm, '<h5>$1</h5>');
        markdown = markdown.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
        markdown = markdown.replace(/^### (.+)$/gm, '<h3>$1</h3>');
        markdown = markdown.replace(/^## (.+)$/gm, '<h2>$1</h2>');
        markdown = markdown.replace(/^# (.+)$/gm, '<h1>$1</h1>');
        markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>');
        markdown = markdown.replace(/^\* (.+)$/gm, '<ul><li>$1</li></ul>');
        markdown = markdown.replace(/^\d+\. (.+)$/gm, '<ol><li>$1</li></ol>');
        markdown = markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        markdown = markdown.replace(/\n/g, '<br>');
        markdown = '<p>' + markdown + '</p>';
        return markdown;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { id: 'spreadsheet', ref: function (spreadsheetObj) { return spreadsheet = spreadsheetObj; }, sheets: sheet, height: '708px', created: onCreate }),
        React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "defaultSidebar", className: "default-sidebar", ref: function (sidebar) { return sidebarObj = sidebar; }, width: "500px", target: ".maincontent", position: 'Right', closeOnDocumentClick: false, showBackdrop: false, created: function () { return sidebarObj.toggle(); } },
            React.createElement(ej2_react_interactive_chat_1.AIAssistViewComponent, { id: "defaultAIAssistView", style: { border: "none" }, ref: function (aiAssistView) { return aiInstance = aiAssistView; }, promptPlaceholder: "Type your prompt for assistance...", prompts: prompts, promptRequest: promptHandler },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "close", className: "e-btn close-btn", style: { float: "right", fontSize: "24px", border: "none", background: "none" }, onClick: function () { return sidebarObj.hide(); } }, "\u00D7")))));
}
exports.default = SmartSpreadsheet;
