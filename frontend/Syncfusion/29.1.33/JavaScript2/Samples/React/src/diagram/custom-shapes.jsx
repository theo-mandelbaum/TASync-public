import * as React from "react";
import './custom.module.css';
import { isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { extend } from '@syncfusion/ej2-base';
import { Query, DataManager, Predicate } from '@syncfusion/ej2-data';
import { ColumnDirective, ColumnsDirective, GridComponent, RowDD, Selection, Edit, DetailRow, Page, Sort, Group, Toolbar, ColumnChooser, ColumnMenu } from '@syncfusion/ej2-react-grids';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, AccumulationDataLabel, PieSeries, AccumulationLegend, AccumulationTooltip } from '@syncfusion/ej2-react-charts';
import { DiagramComponent, NodeConstraints } from "@syncfusion/ej2-react-diagrams";
import { Category, ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ColumnSeries, Legend, DateTime, Tooltip, DataLabel, LineSeries, AreaSeries, ChartAnnotation, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-charts';
import { SampleBase } from "../common/sample-base";
import { DateRangePickerComponent } from '@syncfusion/ej2-react-calendars';
import { expenseData } from './diagram-data';
let shape = { type: "HTML" };
let constraints = NodeConstraints.Default & ~NodeConstraints.Resize & ~NodeConstraints.Rotate;
//Initialize Diagram Nodes
let nodes = [
    {
        id: 'node', offsetX: 409, offsetY: -151, width: 250, height: 30, shape: shape, constraints: constraints
    },
    {
        id: 'lchart', offsetX: 276, offsetY: 550, width: 512, height: 408, shape: shape, constraints: constraints
    },
    {
        id: 'colchart', offsetX: -257, offsetY: 550, width: 512, height: 408, shape: shape, constraints: constraints
    },
    {
        id: 'pie', offsetX: 10, offsetY: 100, width: 1050, height: 450, shape: shape, constraints: constraints
    },
    {
        id: 'node5', offsetX: -434, offsetY: -157, width: 250, height: 30,
        style: { fill: 'transparent', strokeColor: 'transparent' },
        constraints: NodeConstraints.Default & ~NodeConstraints.Select,
        annotations: [{
                content: "EXPENSE TRACKER",
                style: { fontSize: 16, color: "#797979", bold: true }
            }]
    }
];
let expenseDS;
let diagramInstance;
let lineChart;
let columnChart;
let pie;
let lGrid;
let exp = expenseData;
// Function returning grid template
var template = diagramTemplate;
let predicateStart;
let predicateEnd;
let predicate;
let gtemplate = gridTemplate;
let acclegendSettings = { visible: false };
function gridTemplate(props) {
    return (<tr style={{ height: "30px" }}>
      <td>
        <div style={{
            height: "16px", width: "16px", marginLeft: "1px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px", borderBottomLeftRadius: "16px",
            borderBottomRightRadius: "16px",
            background: props.color
        }}/>
      </td>
      <td> {props.text} </td>
      <td> {props.y} </td>
      <td style={{ textAlign: "right" }}> {props.x} </td>
    </tr>);
}
let datachange = onDateRangeChange;
// Initializing date range values
let start = new Date("5/31/2017");
let end = new Date("11/30/2017");
let minDate = new Date(2017, 5, 1);
let maxDate = new Date(2017, 10, 30);
// Setting predicates for date filtering
predicateStart = new Predicate('DateTime', 'greaterthanorequal', start);
predicateEnd = new Predicate('DateTime', 'lessthanorequal', end);
predicate = predicateStart.and(predicateEnd);
// Date range presets
let datePresets = [
    { label: 'Last Month', start: new Date('10/1/2017'), end: new Date('10/31/2017') },
    { label: 'Last 3 Months', start: new Date('9/1/2017'), end: new Date('11/30/2017') },
    { label: 'All Time', start: new Date('6/1/2017'), end: new Date('11/30/2017') }
];
let content1 = '<p style="font-family:Roboto;font-size: 16px;font-weight: 400;font-weight: 400;letter-spacing: 0.02em;line-height: 16px;color: #797979 !important;">Account - Balance</p>';
let content2 = '<p style="font-family:Roboto;font-size: 16px;font-weight: 400;font-weight: 400;letter-spacing: 0.02em;line-height: 16px;color: #797979 !important;">Income - Expense</p>';
let ltooltip = {
    fill: '#707070',
    enable: true,
    shared: true,
    format: '${series.name} : ${point.y}',
    header: 'Month - ${point.x} '
};
let lBorder = { width: 0.5, color: '#A16EE5' };
let lchartArea = {
    border: { width: 0 }
};
let lprimaryXAxis = {
    valueType: 'DateTime',
    labelFormat: 'MMM',
    majorGridLines: { width: 0 },
    intervalType: 'Months'
};
let lprimaryYAxis = {
    maximum: 1800,
    interval: 300,
    labelFormat: 'c0'
};
let lanimation = { enable: false };
let lmargin = { top: 90 };
let lineChartData;
let lmarker = {
    visible: true,
    width: 10,
    height: 10,
    fill: 'white',
    border: { width: 2, color: '#0470D8' },
};
let dataSource = [];
let lineD = [];
let lineDS = [];
let tempData;
let legendData = [];
let tempLineDS = {};
let colIncomeDS = [];
let colExpenseDS = [];
let tempIncomeDS = {};
let tempExpenseDS = {};
let curDateTime;
let colChartIncomeData;
let colChartExpenseData;
let groupValue;
let pieLegendData = [];
let colorPalettes = ['#61EFCD', '#CDDE1F', '#FEC200', '#CA765A', '#2485FA', '#F57D7D', '#C152D2', '#8854D9', '#3D4EB8',
    '#00BCD7'];
let dataLabel = {
    name: 'x', visible: true,
    position: 'Outside', connectorStyle: { length: '10%' },
    font: { color: 'Black', size: '14px', fontFamily: 'Roboto' }
};
;
let pieRenderingData = [];
let accanimation = { enable: false };
let enableLegend = false;
let pieRenderData = [];
let primaryXAxis = {
    labelFormat: 'MMM',
    valueType: 'DateTime',
    intervalType: 'Months',
    edgeLabelPlacement: 'Shift'
};
let primaryYAxis = {
    minimum: 3000,
    maximum: 9000,
    labelFormat: 'c0'
};
let legendSettings;
let margin;
let titleStyle;
let tooltip;
let animation;
let marker;
let cBorder;
let showWaitingPopup = false;
titleStyle = { textAlignment: 'Near', fontWeight: '500', size: '16', color: '#000' };
legendSettings = { visible: true };
tooltip = {
    fill: '#707070',
    enable: true,
    shared: true,
    format: '${series.name} : ${point.y}',
    header: 'Month - ${point.x} ',
};
marker = { visible: true, height: 10, width: 10 };
margin = { top: 90 };
cBorder = { width: 0.5, color: '#A16EE5' };
animation = { enable: false };
let expTotal = 0;
let category = [];
let hiGridData;
let initialRender = true;
let piedata;
// Function to handle date range change
function onDateRangeChange(args) {
    start = args.startDate;
    end = args.endDate;
    predicateStart = new Predicate('DateTime', 'greaterthanorequal', args.startDate);
    predicateEnd = new Predicate('DateTime', 'lessthanorequal', args.endDate);
    predicate = predicateStart.and(predicateEnd);
    getTotalExpense();
    updateChartData();
    refreshPieChart();
    setTimeout(() => {
        pie.refresh();
        lineChart.refresh();
        columnChart.refresh();
    }, 400);
    setTimeout(() => {
        createLegendData('pieUpdate');
    }, 1000);
}
// Function to update chart data based on income and expense types
function updateChartData() {
    new DataManager(exp).executeQuery(new Query()
        .where(predicate.and('TransactionType', 'equal', 'Expense')))
        .then((e) => {
        colChartExpenseData = getColumnChartExpenseDS(e);
    });
    // Query and update income chart data, and line chart data
    new DataManager(exp).executeQuery(new Query()
        .where(predicate.and('TransactionType', 'equal', 'Income')))
        .then((e) => {
        colChartIncomeData = getColumnChartIncomeDS(e);
        lineChartData = getLineChartDS();
        lineChart.series[0].dataSource = lineChartData;
        columnChart.series[0].dataSource = colChartIncomeData;
        columnChart.series[1].dataSource = colChartExpenseData;
    });
}
/** Sets the pie chart's font size based on its size */
function getFontSize(width) {
    if (width > 300) {
        return '13px';
    }
    else if (width > 250) {
        return '8px';
    }
    else {
        return '6px';
    }
}
// Function for initial rendering
function initialRenderr() {
    start = new Date("5/31/2017");
    end = new Date("11/30/2017");
    expenseDS = expenseData;
    predicateStart = new Predicate('DateTime', 'greaterthanorequal', start);
    predicateEnd = new Predicate('DateTime', 'lessthanorequal', end);
    predicate = predicateStart.and(predicateEnd);
    dataSource = expenseData;
    refreshPieChart();
    updateChartData();
    lineChart.refresh();
    columnChart.refresh();
    lGrid.refresh();
    pie.refresh();
}
// Function to refresh pie chart
function refreshPieChart() {
    getTotalExpense();
    createLegendData('pieUpdate');
    pie.series[0].dataSource = piedata;
}
// Function to assign object properties from result to array
function objectAssign(e) {
    let result = [];
    let obj;
    obj = extend(obj, e.result, {}, true);
    for (let data = 0; data < Object.keys(e.result).length; data++) {
        result.push(obj[data]);
    }
    return result;
}
// Function to get column chart data for income
function getColumnChartIncomeDS(e) {
    colIncomeDS = [];
    tempIncomeDS = [];
    let result = objectAssign(e);
    for (let i = 0; i < result.length; i++) {
        let cur = result[i];
        if (cur.DateTime.getMonth() in tempIncomeDS) {
            curDateTime = tempIncomeDS[cur.DateTime.getMonth()];
            tempIncomeDS[cur.DateTime.getMonth()].Amount = parseInt(curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
        }
        else {
            tempIncomeDS[cur.DateTime.getMonth()] = cur;
            tempIncomeDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(tempIncomeDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));
        }
    }
    for (let data in tempIncomeDS) {
        colIncomeDS.push(tempIncomeDS[data]);
    }
    return colIncomeDS;
}
// Function to get column chart data for expense
function getColumnChartExpenseDS(e) {
    colExpenseDS = [];
    tempExpenseDS = [];
    let result = objectAssign(e);
    for (let i = 0; i < result.length; i++) {
        let cur = result[i];
        if (cur.DateTime.getMonth() in tempExpenseDS) {
            curDateTime = tempExpenseDS[cur.DateTime.getMonth()];
            tempExpenseDS[cur.DateTime.getMonth()].Amount = parseInt(curDateTime.Amount, 0) + parseInt(cur.Amount, 0);
        }
        else {
            tempExpenseDS[cur.DateTime.getMonth()] = cur;
            tempExpenseDS[cur.DateTime.getMonth()].DateTime = new Date(new Date(tempExpenseDS[cur.DateTime.getMonth()].DateTime.setHours(0, 0, 0, 0)).setDate(1));
        }
    }
    for (let data in tempExpenseDS) {
        colExpenseDS.push(tempExpenseDS[data]);
    }
    return colExpenseDS;
}
// Function to get line chart data
function getLineChartDS() {
    lineD = [];
    lineDS = [];
    tempLineDS = [];
    let result = [];
    let obj;
    obj = extend(obj, (colIncomeDS.concat(colExpenseDS)), {}, true);
    for (let data = 0; data < Object.keys((colIncomeDS.concat(colExpenseDS))).length; data++) {
        result.push(obj[data]);
    }
    tempLineDS = result;
    for (let i = 0; i < tempLineDS.length; i++) {
        let cur = tempLineDS[i];
        if (cur.DateTime.getMonth() in lineD) {
            curDateTime = lineD[cur.DateTime.getMonth()];
            lineD[cur.DateTime.getMonth()].Amount = Math.abs((parseInt(curDateTime.Amount, 0) - parseInt(cur.Amount, 0)));
        }
        else {
            lineD[cur.DateTime.getMonth()] = cur;
        }
    }
    for (let data = 0; data <= lineD.length; data++) {
        if (lineD[data]) {
            lineDS.push(lineD[data]);
        }
    }
    return lineDS;
}
// Function called when accumulation chart loaded
function acconChartLoaded(args) {
    createLegendData('pie');
    enableLegend = true;
}
// Function to create legend data for pie chart
function createLegendData(initiate) {
    if (pieRenderingData.length > 10) {
        pie.series[0].groupTo = groupValue.toString();
        pie.dataBind();
    }
    if (pie && (initiate === 'pieUpdate' || pieLegendData.length === 0)) {
        pieLegendData = [];
        pieLegendData = pie.visibleSeries[0].points;
    }
    pieRenderData = [];
    for (let i = 0; i < pieLegendData.length; i++) {
        let rowdata = pieLegendData[i];
        if (rowdata.text.indexOf('Others') > -1) {
            rowdata.x = ((rowdata.y / expTotal) * 100).toFixed(2).toString() + '%';
        }
        pieRenderData.push(rowdata);
    }
    if (pieLegendData.length > 0) {
        lGrid.dataSource = pieLegendData;
    }
}
// Function called when text rendered for accumulation chart
function onTextRender(args) {
    args.series.dataLabel.font.size = getFontSize(pie.initialClipRect.width);
    pie.animateSeries = true;
    if (args.text.indexOf('Others') > -1) {
        args.text = 'Others';
    }
}
// Function called when animation completed for accumulation chart
function onAnimateCompleted(args) {
    let element = document.getElementById('total-expense_datalabel_Series_0');
    if (!isNOU(element)) {
        element.style.visibility = 'visible';
    }
}
// Function to calculate total expense
function getTotalExpense() {
    tempData = dataSource;
    let renderingData = [];
    tempData.forEach(item => {
        if (item.TransactionType === 'Expense' && start.valueOf() <= item.DateTime.valueOf()
            && end.valueOf() >= item.DateTime.valueOf()) {
            expTotal += Number(item.Amount);
            legendData.push(item);
            if (category.indexOf(item.Category) < 0) {
                category.push(item.Category);
            }
        }
    });
    /* tslint:disable */
    category.forEach(str => {
        let total = 0;
        legendData.forEach(item => {
            if (str === item.Category) {
                total += Number(item.Amount);
            }
        });
        let percent = ((total / expTotal) * 100).toFixed(2) + '%';
        renderingData.push({ x: str, y: total, text: percent });
    });
    pieRenderingData = new DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new Query().sortByDesc('y')));
    if (pieRenderingData.length > 10) {
        let temp = (new DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new Query().sortByDesc('y').range(0, 9)))[8]);
        groupValue = (temp.y - 1).toString();
        hiGridData = new DataManager(JSON.parse(JSON.stringify(renderingData))).executeLocal((new Query().sortByDesc('y').skip(9)));
        piedata = new DataManager(JSON.parse(JSON.stringify(renderingData)))
            .executeLocal((new Query().sortByDesc('y').range(0, 10)));
    }
}
// Function called when grid loaded
function onGridLoad() {
    createLegendData('pie');
    showWaitingPopup = true;
}
// Function called when chart loaded
function onChartLoaded(args) {
    if (initialRender) {
        initialRender = false;
    }
    else {
        initialRender = false;
    }
}
// Function called when grid data bound
function onGridDataBound(args) {
    showWaitingPopup = false;
}
// Function to define diagram template
function diagramTemplate(props) {
    if (props.id === "node") {
        return (<div className="diagram_border_cus diagram_border_cal">
      <div id="element_calander"><DateRangePickerComponent id="daterangepicker" presets={datePresets} placeholder='Select a range' startDate={start} endDate={end} min={minDate} max={maxDate} change={datachange}/>  </div>
    </div>);
    }
    if (props.id === "lchart") {
        return (<div className="diagram_border_cus diagram_chart"><div id="lineChart"><ChartComponent id='Linecharts' chartArea={lchartArea} ref={lchart => (lineChart = lchart)} primaryXAxis={lprimaryXAxis} primaryYAxis={lprimaryYAxis} margin={lmargin} useGroupingSeparator={true} tooltip={ltooltip}>
      <Inject services={[ColumnSeries, Category, ChartAnnotation, AreaSeries, Legend, Tooltip, DataLabel, LineSeries, DateTime]}/>
      <AnnotationsDirective>
        <AnnotationDirective content={content1} region='Chart' coordinateUnits='Pixel' x='75px' y='9%'>
        </AnnotationDirective>
      </AnnotationsDirective>
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={lineChartData} fill='rgba(4, 112, 216, 0.3)' animation={lanimation} marker={lmarker} border={lBorder} xName='DateTime' yName='Amount' width={2} name='Amount' type='Area'>
        </SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent></div></div>);
    }
    if (props.id === "colchart") {
        return (<div className="diagram_border_cus diagram_chart"> <div id="barChart"><ChartComponent id='colcharts' ref={cchart => (columnChart = cchart)} primaryXAxis={primaryXAxis} primaryYAxis={primaryYAxis} margin={margin} useGroupingSeparator={true} legendSettings={legendSettings} titleStyle={titleStyle} loaded={onChartLoaded} tooltip={tooltip}>
      <Inject services={[ColumnSeries, Category, ChartAnnotation, AreaSeries, Legend, Tooltip, DataLabel, LineSeries, DateTime]}/>
      <AnnotationsDirective>
        <AnnotationDirective content={content2} region='Chart' coordinateUnits='Pixel' x='75px' y='9%'>
        </AnnotationDirective>
      </AnnotationsDirective>
      <SeriesCollectionDirective>
        <SeriesDirective dataSource={colChartIncomeData} animation={animation} legendShape='Circle' marker={marker} border={cBorder} xName='DateTime' yName='Amount' width={2} name='Income' fill='#A16EE5' type='Column'>
        </SeriesDirective>
        <SeriesDirective dataSource={colChartExpenseData} animation={animation} legendShape='Circle' marker={marker} border={cBorder} xName='DateTime' yName='Amount' width={2} name='Expense' fill='#4472C4' type='Column'>
        </SeriesDirective>
      </SeriesCollectionDirective>
    </ChartComponent> </div></div>);
    }
    if (props.id === "pie") {
        return (<div id="diagram_control" className="diagram_border_cus">
      <div className="pane col-xs-12 col-sm-12 col-md-12 pie-container">
        <div className="pieChartHeader">
          <p className="chart-title">Total Expenses</p>
          <p id="rangeDate" className="chart-value">Jun 1 - Dec 1</p>
        </div>
        <div id="pieChart" style={{ height: '100%', width: '49%', overflow: 'hidden', float: 'left' }}>
          <AccumulationChartComponent style={{ display: 'block' }} ref={pies => (pie = pies)} id='pieChart' width='100%' height='350px' legendSettings={acclegendSettings} enableSmartLabels={true} textRender={onTextRender} animationComplete={onAnimateCompleted} loaded={acconChartLoaded}>
            <Inject services={[PieSeries, AccumulationLegend, AccumulationDataLabel, AccumulationTooltip]}/>
            <AccumulationSeriesCollectionDirective>
              <AccumulationSeriesDirective xName='text' yName='y' startAngle={0} legendShape='Circle' endAngle={360} innerRadius='50%' radius='83%' groupTo={groupValue} palettes={colorPalettes} dataLabel={dataLabel} dataSource={pieRenderingData} animation={accanimation}>
              </AccumulationSeriesDirective>
            </AccumulationSeriesCollectionDirective>
          </AccumulationChartComponent>
        </div>
        <div id="grid" style={{ height: '100%', width: '49%', overflow: 'hidden', float: 'left' }}>
          <GridComponent id="legend-grid" ref={lGrids => (lGrid = lGrids)} dataSource={pieRenderData} load={onGridLoad} style={{ boxShadow: 'none' }} rowTemplate={gtemplate} dataBound={onGridDataBound}>
            <Inject services={[Page, RowDD, Toolbar, ColumnChooser, DetailRow, ColumnMenu, Selection, Edit, Sort, Group]}/>
            <ColumnsDirective>
              <ColumnDirective width='10%' textAlign="Center"/>
              <ColumnDirective width='50%'/>
              <ColumnDirective width='20%'/>
              <ColumnDirective width='20%'/>
            </ColumnsDirective>
          </GridComponent>
        </div>
      </div>
    </div>);
    }
}
// Class for HTML node with rendering complete function
export class HtmlNode extends SampleBase {
    rendereComplete() {
        initialRenderr();
        diagramInstance.fitToPage();
    }
    render() {
        return (<div className="control-pane">
        <div id="custom-diagram" className="control-section">
          <DiagramComponent id="diagram" ref={diagram => (diagramInstance = diagram)} width={"100%"} backgroundColor='#f5f5f5' height={"1100px"} nodes={nodes} nodeTemplate={template.bind(this)}/>
        </div>
        <div id="action-description">
          <p>
            This sample shows how to host an element of HTML within a node. The expense tracker application can be created using chart and grid components.
          </p>
        </div>
        <div id="description">
          <p>
            This example illustrates how an HTML control is hosted inside a node. By setting <code>HTML</code> to the type property of the shape, the template node can be enabled. You can define the content to be hosted by using <code>NodeTemplate</code>.
          </p>
          <br />
        </div>
      </div>);
    }
}
