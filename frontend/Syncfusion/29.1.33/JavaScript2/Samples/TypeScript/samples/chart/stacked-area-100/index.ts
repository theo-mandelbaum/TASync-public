import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart, StackingAreaSeries, DateTime, ILoadedEventArgs, Legend, ChartTheme, Highlight, Tooltip } from '@syncfusion/ej2-charts';
Chart.Inject(StackingAreaSeries, DateTime, Legend, Highlight, Tooltip);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
let chartData: any[] = [
    { x: new Date(2000, 0, 1), y: 0.61, y1: 0.03, y2: 0.48, y3: 0.23 },
    { x: new Date(2001, 0, 1), y: 0.81, y1: 0.05, y2: 0.53, y3: 0.17 },
    { x: new Date(2002, 0, 1), y: 0.91, y1: 0.06, y2: 0.57, y3: 0.17 },
    { x: new Date(2003, 0, 1), y: 1.00, y1: 0.09, y2: 0.61, y3: 0.20 },
    { x: new Date(2004, 0, 1), y: 1.19, y1: 0.14, y2: 0.63, y3: 0.23 },
    { x: new Date(2005, 0, 1), y: 1.47, y1: 0.20, y2: 0.64, y3: 0.36 },
    { x: new Date(2006, 0, 1), y: 1.74, y1: 0.29, y2: 0.66, y3: 0.43 },
    { x: new Date(2007, 0, 1), y: 1.98, y1: 0.46, y2: 0.76, y3: 0.51 },
    { x: new Date(2008, 0, 1), y: 1.99, y1: 0.64, y2: 0.77, y3: 0.72 },
    { x: new Date(2009, 0, 1), y: 1.70, y1: 0.75, y2: 0.55, y3: 1.29 },
    { x: new Date(2010, 0, 1), y: 1.48, y1: 1.06, y2: 0.54, y3: 1.38 },
    { x: new Date(2011, 0, 1), y: 1.38, y1: 1.25, y2: 0.57, y3: 1.82 },
    { x: new Date(2012, 0, 1), y: 1.66, y1: 1.55, y2: 0.61, y3: 2.16 },
    { x: new Date(2013, 0, 1), y: 1.66, y1: 1.55, y2: 0.67, y3: 2.51 },
    { x: new Date(2014, 0, 1), y: 1.67, y1: 1.65, y2: 0.67, y3: 2.61 }
];

/**
 * Sample for StackedArea100 series
 */

    
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'DateTime',
              intervalType: 'Years',
              majorGridLines: { width: 0 },
              labelFormat: 'y',
              edgeLabelPlacement: 'Shift',
              lineStyle: { width: 0 },
              minimum: new Date(1999, 0, 1), maximum: new Date(2015, 0, 1)
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            majorTickLines: { width: 0 }, rangePadding: 'None', interval: 20, lineStyle: {width : 0}
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: chartData, xName: 'x', yName: 'y',
                //Series type as 100% stacked area series
                type: 'StackingArea100',
                name: 'Bank-Transfer',
                border: {width: 0.5 , color: '#ffffff ' }, opacity: 1,
            }, {
                dataSource: chartData, xName: 'x', yName: 'y1',
                type: 'StackingArea100', name: 'Credit Card',border: {width: 0.5 , color: '#ffffff ' }, opacity: 1,
            }, {
                dataSource: chartData, xName: 'x', yName: 'y2',
                type: 'StackingArea100', name: 'Debit Card',border: { width: 0.5 , color: '#ffffff '}, opacity: 1,
            }, {
                dataSource: chartData, xName: 'x', yName: 'y3', 
                type: 'StackingArea100', name: 'Cash',border: {width: 0.5 , color: '#ffffff '}, opacity: 1,
            }
        ],
        width : Browser.isDevice ? '100%' : '75%',tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true },
        legendSettings: {enableHighlight:true}, 
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        //Initializing Chart Title
        title: 'Sales by Payment Mode'
    });
    chart.appendTo('#container');
