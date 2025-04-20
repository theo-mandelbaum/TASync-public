"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var data_source_1 = require("./data-source");
var sample_base_1 = require("../common/sample-base");
require("./tool-bar.css");
/**
 * PivotView KeyboardNavigation Sample
 */
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    dataSource: data_source_1.Pivot_Data,
    expandAll: false,
    allowLabelFilter: true,
    allowMemberFilter: true,
    allowValueFilter: true,
    values: [{ name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};
function PivotKeyboardNavigation() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
        'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'];
    function saveReport(args) {
        var reports = [];
        var isSaved = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            reports.map(function (item) {
                if (args.reportName === item.reportName) {
                    item.report = args.report;
                    isSaved = true;
                }
            });
            if (!isSaved) {
                reports.push(args);
            }
            localStorage.pivotviewReports = JSON.stringify(reports);
        }
    }
    function fetchReport(args) {
        var reportCollection = [];
        var reeportList = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item) { reeportList.push(item.reportName); });
        args.reportName = reeportList;
    }
    function loadReport(args) {
        var reportCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        reportCollection.map(function (item) {
            if (args.reportName === item.reportName) {
                args.report = item.report;
            }
        });
        if (args.report) {
            pivotObj.dataSourceSettings = JSON.parse(args.report).dataSourceSettings;
        }
    }
    function removeReport(args) {
        var reportCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportCollection = JSON.parse(localStorage.pivotviewReports);
        }
        for (var i = 0; i < reportCollection.length; i++) {
            if (reportCollection[i].reportName === args.reportName) {
                reportCollection.splice(i, 1);
            }
        }
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportCollection);
        }
    }
    function renameReport(args) {
        var reportsCollection = [];
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reportsCollection = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.isReportExists) {
            for (var i = 0; i < reportsCollection.length; i++) {
                if (reportsCollection[i].reportName === args.rename) {
                    reportsCollection.splice(i, 1);
                }
            }
        }
        reportsCollection.map(function (item) { if (args.reportName === item.reportName) {
            item.reportName = args.rename;
        } });
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            localStorage.pivotviewReports = JSON.stringify(reportsCollection);
        }
    }
    function newReport() {
        pivotObj.setProperties({ dataSourceSettings: { columns: [], rows: [], values: [], filters: [] } }, false);
    }
    function beforeToolbarRender(args) {
        args.customToolbar.splice(6, 0, {
            type: 'Separator'
        });
        args.customToolbar.splice(9, 0, {
            type: 'Separator'
        });
    }
    function chartOnLoad(args) {
        var selectedTheme = location.hash.split("/")[1];
        selectedTheme = selectedTheme ? selectedTheme : "Material";
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: 'pivot-table-section', style: { overflow: 'initial' } },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '450', enableValueSorting: true, showFieldList: true, gridSettings: { columnWidth: 140 }, allowExcelExport: true, allowNumberFormatting: true, allowConditionalFormatting: true, showGroupingBar: true, allowDrillThrough: true, showTooltip: false, allowPdfExport: true, showToolbar: true, allowCalculatedField: true, toolbar: toolbarOptions, newReport: newReport.bind(this), renameReport: renameReport.bind(this), removeReport: removeReport.bind(this), loadReport: loadReport.bind(this), fetchReport: fetchReport.bind(this), saveReport: saveReport.bind(this), toolbarRender: beforeToolbarRender.bind(this), chartSettings: { title: 'Sales Analysis', load: chartOnLoad.bind(this) }, editSettings: { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: true } },
                React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList, ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.Toolbar, ej2_react_pivotview_1.PDFExport, ej2_react_pivotview_1.ExcelExport, ej2_react_pivotview_1.ConditionalFormatting, ej2_react_pivotview_1.GroupingBar, ej2_react_pivotview_1.DrillThrough, ej2_react_pivotview_1.NumberFormatting] }))),
        React.createElement("div", { id: "description" },
            React.createElement("i", null, "Below key combinations can be used in pivot table to initiate various actions"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "FOCUS"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "J")),
                            React.createElement("span", null, " - Focuses the Pivot Table component.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "PIVOT TABLE"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves the cell focus right side. If no cells are focused, it moves to the next active element in the browser page. ")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves the cell focus left side. If no cells are focused, it moves to the previous active element in the browser page. ")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - Moves the cell focus downwards. ")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - Moves the cell focus upwards. ")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left arrow")),
                            React.createElement("span", null, " - Moves the cell focus left side. ")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - Moves the cell focus right side.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - Goes to the first cell in the current row.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - Goes to the last cell in the current row.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - Goes to the first cell in the table.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - Goes to the last cell in the table.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - If the current cell is an expand/collapse cell, it performs expand/collapse operation (drill operation). If the current row/column header is in value sort state, it performs value sorting.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - If value sorting is enabled in the pivot table and the current cell is a header with respect to its value axis, it performs value sorting to either ascending or descending order.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "GROUPING BAR"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the next active element (field\u2019s button) in the grouping bar. If no active elements present, it moves to the next active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the previous active element (field\u2019s button) in the grouping bar. If no active elements present, it moves to the previous active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "F")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button and if it has a filter icon, the filter dialog will be opened to perform filtering.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "S")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button and if it has a sort icon, the sorting will be performed to the selected field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "E")),
                            React.createElement("span", null, " - If the current active element is a calculated field\u2019s button and if it has an edit icon, the calculated field dialog will be opened to perform editing the selected calculated field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - Performs the selection operation of the current active element. If the current active element is a field\u2019s button and it has a dropdown icon, the aggregation menu will open to perform calculations using aggregation options to the selected value field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Delete")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button, the selected field will be removed from the current report.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - If the current active element is a dropdown list, the next item will be selected.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - If the current active element is a dropdown list, the previous item will be selected.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - If the current active element is a dropdown list, the first item will be selected.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - If the current active element is a dropdown list, the last item will be selected.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "Down")),
                            React.createElement("span", null, " - If the current active element is a dropdown list, the popup will be opened.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "Down")),
                            React.createElement("span", null, " - If the current active element is a dropdown list, the popup will be closed.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Esc or Escape")),
                            React.createElement("span", null, " - Closes the dropdown list.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "FIELD LIST"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "F")),
                            React.createElement("span", null, " - If the popup field list is enabled in either the pivot table or the pivot chart, the field list dialog will be opened.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the next active element in the field list. If no active elements present, it moves to the next active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the previous active element in the field list. If no active elements present, it moves to the previous active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "F")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button and if it has a filter icon, the filter dialog will be opened to perform filtering.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "S")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button and if it has a sort icon, the sorting will be performed to the selected field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "E")),
                            React.createElement("span", null, " - If the current active element is a calculated field\u2019s button and if it has an edit icon, the calculated field dialog will be opened to perform editing the selected calculated field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - Performs the selection operation of the current active element. If the current active element is a field\u2019s button and if it has a dropdown icon, the aggregation menu will be opened to perform calculations using aggregation options to the selected value field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Delete")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button, the selected field will be removed from the current report.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it moves to the next node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it moves to the prevous node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it collapses the current node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it expands the current node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - If the current active element is a tree node, it goes to the first node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - If the current active element is a tree node, it goes to the last node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Space")),
                            React.createElement("span", null, " - If the current active element is a tree node or a checkbox element, it will be either checked or unchecked.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Esc or Escape")),
                            React.createElement("span", null, " - Closes the popup field list dialog.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "TOOLBAR"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the next active option in the toolbar. If no active elements present, it moves to the next active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the previous active option in the toolbar. If no active elements present, it moves to the previous active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - Performs the selection operation of the current active element.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "CALCULATED FIELD"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "E")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button and if it has an edit icon in either the field list or grouping bar UI, the calculated field dialog will be opened to perform editing the selected calculated field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the next active element in the calculated field dialog. If no active elements present, it moves to the next active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the previous active element in the calculated field dialog. If no active elements present, it moves to the previous active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - Performs the selection operation of the current active element. If the current active element is a tree node, it copies the selected field name/formula to the formula text area to perform calculations.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it moves to the next node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it moves to the prevous node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it collapses the current node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it expands the current node. If the current active element is a tree node and has a menu icon, the aggregation menu will be opened to select appropriate aggregation type to the selected field.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - If the current active element is a tree node, it goes to the first node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - If the current active element is a tree node, it goes to the last node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Esc or Escape")),
                            React.createElement("span", null, " -  the filter dialog.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "DRILL THROUGH"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the next active element in the drill-through dialog. If the current active element is a Grid cell, it moves the cell focus to right side. If no active elements present, then it moves to the next active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the previous active element in the drill-through dialog. If the current active element is a Grid cell, it moves the cell focus to left side, If no active elements present, then it moves to the previous active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - Moves the row/cell focus downwards.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - Moves the row/cell focus upwards.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left arrow")),
                            React.createElement("span", null, " - Moves the cell focus left side.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - Moves the cell focus left side.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - Goes to the first cell in the current row.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - Goes to the last cell in the current row.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - Goes to the first cell in the table.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Ctrl"),
                                " + ",
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - Goes to the first cell in the table.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - Performs the selection operation of the current active element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Esc or Escape")),
                            React.createElement("span", null, " - If the cell is in selected state, the it deselects all rows/cells. If the row/cell is in edit state, it cancels the current entries in the row/cell. If the current active element is not a row/cell, it closes the drill-through dialog.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "F2")),
                            React.createElement("span", null, " - If the cell is in selected state, the it deselects all rows/cells. If the row/cell is in edit state, it cancels the current entries in the row/cell. If the current active element is not a row/cell, it closes the drill-through dialog.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Insert")),
                            React.createElement("span", null, " - Adds a new row/cell in the data grid.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Delete")),
                            React.createElement("span", null, " - Removes the selected row in the data grid.")))),
                React.createElement("li", null,
                    React.createElement("b", null, "FILTER DIALOG"),
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "F")),
                            React.createElement("span", null, " - If the current active element is a field\u2019s button and if it has a filter icon in either the field list or grouping bar UI, the filter dialog will be opened to perform filtering.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the next active element in the filter dialog. If no active elements present, it moves to the next active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Shift"),
                                " + ",
                                React.createElement("kbd", null, "Tab")),
                            React.createElement("span", null, " - Moves to the previous active element in the filter dialog. If no active elements present, it moves to the previous active element in the browser page.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Enter")),
                            React.createElement("span", null, " - Performs the selection operation of the current active element. If the current active element is a tab, the current tab element will be selected. If the current active element is a tree node, the current node will be either checked or unchecked. If the current active element is DropDownList, the focus item will be selected, and the popup list will close when it is open. Otherwise, toggles the popup list.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Down arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it moves to the next node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Up arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it moves to the prevous node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Left aArrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it collapses the current node.  If the current active element is a tab, it moves focus to the previous tab element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Right arrow")),
                            React.createElement("span", null, " - If the current active element is a tree node, it expands the current node.  If the current active element is a tab, it moves focus to the next tab element.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Home")),
                            React.createElement("span", null, " - If the current active element is a tree node, it goes to the first node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "End")),
                            React.createElement("span", null, " - If the current active element is a tree node, it goes to the last node.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Space")),
                            React.createElement("span", null, " - If the current active element is a tree node or a checkbox element, it will be either checked or unchecked.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Esc or Escape")),
                            React.createElement("span", null, " - Closes the filter dialog.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "Down")),
                            React.createElement("span", null, " - If the current active element is a DropDownList or DatePicker or DateTimePicker, the popup will be opened.")),
                        React.createElement("li", null,
                            React.createElement("span", { className: "key-class" },
                                React.createElement("kbd", null, "Alt"),
                                " + ",
                                React.createElement("kbd", null, "Up")),
                            React.createElement("span", null, " - If the current active element is a DropDownList or DatePicker or DateTimePicker, the popup will be closed."))))),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the keyboard navigation can be found in this ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/pivotview/accessibility#keyboard-interaction' }, "documentation section"),
                "."))));
}
exports.default = PivotKeyboardNavigation;
