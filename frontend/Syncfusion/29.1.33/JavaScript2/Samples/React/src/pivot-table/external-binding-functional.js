"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var ej2_heatmap_1 = require("@syncfusion/ej2-heatmap");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./pivot-chart.css");
/**
 * PivotView Sample with Selection feature with Heatmap integration.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    enableSorting: true,
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    rows: [{ name: 'Country' }, { name: 'Products' }],
    valueSortSettings: { headerDelimiter: ' - ' },
    dataSource: Pivot_Data,
    expandAll: true,
    values: [{ name: 'Sold', caption: 'Units Sold' }],
    filters: [],
    formatSettings: [{ name: 'Sold', format: 'N0' }],
};
function Integration() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onInit = true;
    var heatmap;
    var pivotObj;
    var selectedCells;
    var measureList = {};
    var xLabels = [];
    var yLabels = [];
    var jsonDataSource = [];
    function onDataBound() {
        if (onInit && pivotObj.grid.getRows().length > 1) {
            pivotObj.grid.selectionModule.selectCellsByRange({ cellIndex: 1, rowIndex: 1 }, { cellIndex: 3, rowIndex: 4 });
        }
    }
    function onSelected(args) {
        selectedCells = args.selectedCellsInfo;
        if (selectedCells && selectedCells.length > 0) {
            frameSeries();
            heatmapUpdate();
        }
    }
    function frameSeries() {
        var columnGroupObject = {};
        xLabels = [];
        yLabels = [];
        jsonDataSource = [];
        for (var _i = 0, selectedCells_1 = selectedCells; _i < selectedCells_1.length; _i++) {
            var cell = selectedCells_1[_i];
            if (cell.measure !== '') {
                var columnSeries = (pivotObj.dataSourceSettings.values.length > 1 && measureList[cell.measure]) ?
                    (cell.columnHeaders.toString() + ' ~ ' + measureList[cell.measure]) : cell.columnHeaders.toString();
                columnSeries = columnSeries == '' && cell.measure != '' ? 'Grand Total' : columnSeries;
                var rHeaders = cell.rowHeaders == '' && cell.currentCell.axis != 'column' ? 'Grand Total' : cell.rowHeaders.toString();
                if (columnGroupObject[columnSeries]) {
                    columnGroupObject[columnSeries].push({ x: rHeaders.toString(), y: Number(cell.value) });
                }
                else {
                    columnGroupObject[columnSeries] = [{ x: rHeaders.toString(), y: Number(cell.value) }];
                    yLabels.push(columnSeries);
                }
                if (xLabels.indexOf(rHeaders.toString()) == -1) {
                    xLabels.push(rHeaders.toString());
                }
            }
        }
        var _loop_1 = function (xcnt) {
            var xName = xLabels[xcnt];
            var row = { 'xMember': xName };
            for (var ycnt = 0; ycnt < yLabels.length; ycnt++) {
                var YName = yLabels[ycnt];
                var col = columnGroupObject[YName].filter(function (item) { return item.x == xName; });
                row[YName] = col.length > 0 ? col[0].y : '';
            }
            jsonDataSource.push(row);
        };
        for (var xcnt = 0; xcnt < xLabels.length; xcnt++) {
            _loop_1(xcnt);
        }
    }
    function heatmapUpdate() {
        if (onInit) {
            onInit = false;
            ej2_heatmap_1.HeatMap.Inject(ej2_heatmap_1.Adaptor, ej2_heatmap_1.Legend, ej2_heatmap_1.Tooltip);
            heatmap = new ej2_heatmap_1.HeatMap({
                titleSettings: {
                    text: 'Sales Analysis'
                },
                legendSettings: {
                    visible: false,
                    position: 'Top',
                },
                xAxis: {
                    title: { text: pivotObj.dataSourceSettings.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: xLabels,
                    labelIntersectAction: "Trim"
                },
                yAxis: {
                    title: { text: pivotObj.dataSourceSettings.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                    labels: yLabels,
                },
                dataSource: jsonDataSource,
                dataSourceSettings: {
                    isJsonData: true,
                    adaptorType: 'Table',
                    xDataMapping: 'xMember',
                },
                load: function (args) {
                    var selectedTheme = location.hash.split('/')[1];
                    selectedTheme = selectedTheme ? selectedTheme : 'Material';
                    args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
                },
            }, '#heatmap');
        }
        else {
            heatmap.dataSource = jsonDataSource;
            heatmap.xAxis = {
                title: { text: pivotObj.dataSourceSettings.rows.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: xLabels,
                labelIntersectAction: "Trim"
            };
            heatmap.yAxis = {
                title: { text: pivotObj.dataSourceSettings.values.map(function (args) { return args.caption || args.name; }).join(' ~ ') },
                labels: yLabels
            };
            heatmap.refresh();
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'col-lg-12 control-section', style: { overflow: 'auto' } },
            React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', ref: function (d) { return pivotObj = d; }, dataSourceSettings: dataSourceSettings, width: '100%', height: '300', dataBound: onDataBound.bind(this), cellSelected: onSelected.bind(this), gridSettings: {
                    columnWidth: 120, allowSelection: true,
                    selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
                } }),
            React.createElement("br", null),
            React.createElement("br", null),
            React.createElement("div", { id: "heatmap", style: { height: '450px' } })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates rendering HeatMap control by providing desired data from a pivot table on selection. Not only HeatMap, but any other control (including third party) can be used for this purpose.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, the cell selection feature is enabled with the api ",
                React.createElement("code", null, "allowSelection"),
                " property and its type and mode are configured using the",
                React.createElement("code", null, "selectionSettings"),
                " property. The ",
                React.createElement("code", null, "cellSelected"),
                " event gets fired on every selection operation performed in the pivot table. This event returns the selected cell information, like row header name, column header name, measure name, and value. Based on this information, the heatmap will be plotted."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the Essential",
                React.createElement("sup", null, "\u00AE"),
                " JS2 Pivot Table can be found in these ",
                React.createElement("a", { target: '_blank', href: "https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#selection" }, "Selection"),
                " & ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/heatmap-chart/getting-started" }, "Heatmap"),
                " documentation section."))));
}
exports.default = Integration;
