import * as React from 'react';
import { PivotViewComponent } from '@syncfusion/ej2-react-pivotview';
import { updateSampleSection } from '../common/sample-base';
import { HeatMap, Adaptor, Legend, Tooltip } from '@syncfusion/ej2-heatmap';
import * as pivotData from './pivot-data/Pivot_Data.json';
import './pivot-chart.css';
/**
 * PivotView Sample with Selection feature with Heatmap integration.
 */
/* tslint:disable */
let Pivot_Data = pivotData.data;
let dataSourceSettings = {
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
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let onInit = true;
    let heatmap;
    let pivotObj;
    let selectedCells;
    let measureList = {};
    let xLabels = [];
    let yLabels = [];
    let jsonDataSource = [];
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
        let columnGroupObject = {};
        xLabels = [];
        yLabels = [];
        jsonDataSource = [];
        for (let cell of selectedCells) {
            if (cell.measure !== '') {
                let columnSeries = (pivotObj.dataSourceSettings.values.length > 1 && measureList[cell.measure]) ?
                    (cell.columnHeaders.toString() + ' ~ ' + measureList[cell.measure]) : cell.columnHeaders.toString();
                columnSeries = columnSeries == '' && cell.measure != '' ? 'Grand Total' : columnSeries;
                let rHeaders = cell.rowHeaders == '' && cell.currentCell.axis != 'column' ? 'Grand Total' : cell.rowHeaders.toString();
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
        for (let xcnt = 0; xcnt < xLabels.length; xcnt++) {
            let xName = xLabels[xcnt];
            let row = { 'xMember': xName };
            for (let ycnt = 0; ycnt < yLabels.length; ycnt++) {
                let YName = yLabels[ycnt];
                let col = columnGroupObject[YName].filter(function (item) { return item.x == xName; });
                row[YName] = col.length > 0 ? col[0].y : '';
            }
            jsonDataSource.push(row);
        }
    }
    function heatmapUpdate() {
        if (onInit) {
            onInit = false;
            HeatMap.Inject(Adaptor, Legend, Tooltip);
            heatmap = new HeatMap({
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
                load: (args) => {
                    let selectedTheme = location.hash.split('/')[1];
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
    return (<div className='control-pane'>
            <div className='col-lg-12 control-section' style={{ overflow: 'auto' }}>
                <PivotViewComponent id='PivotView' ref={d => pivotObj = d} dataSourceSettings={dataSourceSettings} width={'100%'} height={'300'} dataBound={onDataBound.bind(this)} cellSelected={onSelected.bind(this)} gridSettings={{
            columnWidth: 120, allowSelection: true,
            selectionSettings: { mode: 'Cell', type: 'Multiple', cellSelectionMode: 'Box' }
        }}>
                </PivotViewComponent>
                <br />
                <br />
                <div id="heatmap" style={{ height: '450px' }}></div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates rendering HeatMap control by providing desired data from a pivot table on selection. Not
                    only HeatMap, but any other control (including third party) can be used for this purpose.
                </p>
            </div>
            <div id="description">
                <p>In this sample, the cell selection feature is enabled with the api <code>allowSelection</code> property and its
                    type and mode are configured using the
                    <code>selectionSettings</code> property. The <code>cellSelected</code> event gets fired on every selection
                    operation performed in the pivot table. This event returns the selected cell information, like row header name,
                    column header name, measure name, and value. Based on this information, the heatmap will be plotted.
                </p><br />
                <p>
                    More information on the Essential<sup>®</sup> JS2 Pivot Table can be found in these <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#selection">Selection</a> & <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/getting-started">Heatmap</a> documentation section.
                </p>
            </div>
        </div>);
}
export default Integration;
