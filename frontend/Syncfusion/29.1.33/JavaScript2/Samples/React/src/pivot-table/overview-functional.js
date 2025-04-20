"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var dataSource = require("./pivot-data/universitydata.json");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./overview.css");
/**
 * PivotView Toolbar Sample
 */
var UniversityData = dataSource.data;
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'region', caption: 'Region' }, { name: 'country', caption: 'Country' }],
    rows: [{ name: 'rank_display', caption: 'Rank', expandAll: true, allowDragAndDrop: false },
        { name: 'university', caption: 'University', expandAll: true, allowDragAndDrop: false }],
    formatSettings: [{ name: 'international_students', format: 'N0' },
        { name: 'faculty_count', format: 'N0' }],
    dataSource: UniversityData,
    expandAll: false,
    values: [{ name: 'international_students', caption: 'Students' },
        { name: 'faculty_count', caption: 'Faculty' }],
    filters: [{ name: 'type', caption: 'University Type' }],
    filterSettings: [{ name: 'region', type: 'Exclude', items: ['Africa', 'Latin America'] }],
    fieldMapping: [{ name: 'rank_display', dataType: 'number' },
        { name: 'country', caption: 'Country' },
        { name: 'city', caption: 'City' },
        { name: 'region', caption: 'Region' },
        { name: 'research_output', caption: 'Research Output' },
        { name: 'student_faculty_ratio', caption: 'Student faculty ratio' }],
    groupSettings: [{ name: 'rank_display', type: 'Number', rangeInterval: 100 }],
    conditionalFormatSettings: [
        {
            measure: 'international_students',
            value1: 1,
            value2: 5000,
            conditions: 'Between',
            style: {
                backgroundColor: '#E10000',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'international_students',
            value1: 50000,
            conditions: 'GreaterThan',
            style: {
                backgroundColor: '#0C860C',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'faculty_count',
            value1: 1,
            value2: 1000,
            conditions: 'Between',
            style: {
                backgroundColor: '#E10000',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        },
        {
            measure: 'faculty_count',
            value1: 10000,
            conditions: 'GreaterThan',
            style: {
                backgroundColor: '#0C860C',
                color: 'white',
                fontFamily: 'Tahoma',
                fontSize: '12px'
            },
            applyGrandTotals: false
        }
    ],
    showHeaderWhenEmpty: false,
    emptyCellsTextContent: '-',
    excludeFields: ['link', 'logo']
};
function PivotToolbar() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pivotObj;
    var toolbarOptions = ['New', 'Save', 'SaveAs', 'Rename', 'Remove', 'Load',
        'Grid', 'Chart', 'Export', 'SubTotal', 'GrandTotal', 'Formatting', 'FieldList'];
    function queryCellInfo(args) {
        if (args.cell && args.cell.classList.contains('e-valuescontent') && args.data && args.data[0].hasChild) {
            var pivotValues = void 0;
            var colIndex = Number(args.cell.getAttribute('aria-colindex')) - 1;
            if (!isNaN(colIndex)) {
                pivotValues = pivotObj.pivotValues[args.data[colIndex].rowIndex][args.data[colIndex].colIndex];
            }
            if (pivotValues && args.cell && args.cell.classList.contains(pivotValues.cssClass)) {
                args.cell.classList.remove(pivotValues.cssClass);
                pivotValues.style = undefined;
            }
        }
    }
    function cellTemplate(args) {
        if (args.cellInfo && args.cellInfo.axis === 'row' && args.cellInfo.valueSort.axis === 'university') {
            var imgElement = (0, ej2_base_1.createElement)('img', {
                className: 'university-logo',
                attrs: {
                    'src': UniversityData[args.cellInfo.index[0]].logo,
                    'alt': args.cellInfo.formattedText + ' Image',
                    'width': '30',
                    'height': '30'
                },
            });
            var cellValue = (0, ej2_base_1.select)('.e-cellvalue', args.targetCell);
            cellValue.classList.add('e-hyperlinkcell');
            cellValue.addEventListener('click', hyperlinkCellClick.bind(pivotObj));
            args.targetCell.firstElementChild.insertBefore(imgElement, cellValue);
        }
        return '';
    }
    function hyperlinkCellClick(args) {
        var cell = args.target.closest('.e-rowsheader');
        var pivotValue = pivotObj.pivotValues[Number(cell.getAttribute('index'))][Number(cell.getAttribute('aria-colindex')) - 1];
        var link = UniversityData[pivotValue.index[0]].link;
        window.open(link, '_blank');
    }
    function saveReport(args) {
        var reports = [];
        var isSaved = false;
        if (localStorage.pivotviewReports && localStorage.pivotviewReports !== "") {
            reports = JSON.parse(localStorage.pivotviewReports);
        }
        if (args.report && args.reportName && args.reportName !== '') {
            var report = JSON.parse(args.report);
            report.dataSourceSettings.dataSource = [];
            report.pivotValues = [];
            args.report = JSON.stringify(report);
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
            var report = JSON.parse(args.report);
            report.dataSourceSettings.dataSource =
                pivotObj.dataSourceSettings.dataSource;
            pivotObj.dataSourceSettings = report.dataSourceSettings;
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
    function chartSeriesCreated(args) {
        pivotObj.chartSettings.chartSeries.legendShape = pivotObj.chartSettings.chartSeries.type === 'Polar' ? 'Rectangle' : 'SeriesType';
    }
    function excelQueryCellInfo(args) {
        if ((args === null || args === void 0 ? void 0 : args.cell).axis === 'value' && (args === null || args === void 0 ? void 0 : args.cell).value === undefined) {
            args.style.numberFormat = undefined;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("meta", { name: "referrer", content: "never" }),
        React.createElement("div", { className: 'control-section', id: 'pivot-table-section', style: { overflow: 'initial' } },
            React.createElement("div", null,
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (scope) { pivotObj = scope; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '600', showFieldList: true, exportAllPages: false, maxNodeLimitInMemberEditor: 50, cellTemplate: cellTemplate.bind(this), showGroupingBar: true, allowGrouping: true, enableVirtualization: true, enableValueSorting: true, allowDeferLayoutUpdate: true, allowDrillThrough: true, gridSettings: {
                        columnWidth: 120, allowSelection: true, rowHeight: 36,
                        selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' },
                        excelQueryCellInfo: excelQueryCellInfo.bind(this),
                        queryCellInfo: queryCellInfo.bind(this)
                    }, allowExcelExport: true, allowNumberFormatting: true, allowConditionalFormatting: true, allowPdfExport: true, showToolbar: true, allowCalculatedField: true, displayOption: { view: 'Both' }, toolbar: toolbarOptions, newReport: newReport.bind(this), renameReport: renameReport.bind(this), removeReport: removeReport.bind(this), loadReport: loadReport.bind(this), fetchReport: fetchReport.bind(this), saveReport: saveReport.bind(this), toolbarRender: beforeToolbarRender.bind(this), chartSettings: { title: 'Top Universities Analysis', load: chartOnLoad.bind(this) }, chartSeriesCreated: chartSeriesCreated.bind(this), enableFieldSearching: true },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList, ej2_react_pivotview_1.CalculatedField, ej2_react_pivotview_1.Toolbar, ej2_react_pivotview_1.PDFExport, ej2_react_pivotview_1.ExcelExport, ej2_react_pivotview_1.ConditionalFormatting, ej2_react_pivotview_1.NumberFormatting, ej2_react_pivotview_1.GroupingBar, ej2_react_pivotview_1.Grouping, ej2_react_pivotview_1.VirtualScroll, ej2_react_pivotview_1.DrillThrough] }))),
            React.createElement("div", { className: 'urllink' },
                "Source:",
                React.createElement("a", { href: "https://www.topuniversities.com/university-rankings?utm_source=topnav", target: "_blank" }, "QS World University Rankings"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample provides an overview of ",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/react-components/react-pivot-table" }, "React Pivot Table"),
                ", which allows you to organize and summarize pivot data in a detailed or abstract view and display it as a grid and chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The React Pivot Table is a powerful control for organizing and summarizing business data and displaying the results in a table and chart format. It includes major features such as built-in ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/aggregation/#aggregation" }, "aggregations"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/field-list/#field-list" }, "pivot table field list"),
                " for report manipulation, Excel-like ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/filtering/#filtering" }, "filtering"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/sorting/#sorting" }, "sorting"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/editing/#editing" }, "editing"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/excel-export/#excel-export" }, "Excel"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/pdf-export/#pdf-export" }, "PDF"),
                " exporting, and so on, which are used in this demo, as well as a large data source loaded without any performance degradation by using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/virtual-scrolling/#virtual-scrolling" }, "virtualization"),
                " support."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the Essential",
                React.createElement("sup", null, "\u00AE"),
                " JS2 Pivot Table can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/getting-started/#getting-started" }, "documentation section"),
                "."))));
}
exports.default = PivotToolbar;
