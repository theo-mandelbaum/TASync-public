import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, ColumnSeries, Category, Tooltip, Legend, ILoadedEventArgs, ChartTheme, Highlight, DataLabel
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(ColumnSeries, Category, Tooltip, Legend, Highlight, DataLabel);

/**
 * Sample for Range Color Mapping
 */

    
    let chart: Chart = new Chart({
        primaryXAxis: {
            valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },
        primaryYAxis: {
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            labelFormat: '{value}°C',
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        series: [
            {
                dataSource: [
                    { x: 'Jan', y: 6 },
                    { x: 'Feb', y: 8.9 },
                    { x: 'Mar', y: 12 },
                    { x: 'Apr', y: 17.5 },
                    { x: 'May', y: 22.1 },
                    { x: 'June', y: 25 },
                    { x: 'July', y: 29.4 },
                    { x: 'Aug', y: 29.6 },
                    { x: 'Sep', y: 25.8 },
                    { x: 'Oct', y: 21.1 },
                    { x: 'Nov', y: 15.5 },
                    { x: 'Dec', y: 9.9 }

                ], xName: 'x', yName: 'y', type: 'Column',
                animation: { enable: false }, name: 'USA',
                cornerRadius: {
                    topLeft: 10, topRight: 10
                },
                marker: {
                    dataLabel: {
                        visible: true,
                        position: 'Outer'
                    }
                }
            }
        ],
        rangeColorSettings: [
            {
                label: '1°C to 10°C',
                start: 1,
                end: 10,
                colors: ['#F9D422']
            },
            {
                label: '11°C to 20°C',
                start: 11,
                end: 20,
                colors: ['#F28F3F']
            },
            {
                label: '21°C to 30°C',
                start: 21,
                end: 30,
                colors: ['#E94F53']
            }
        ],
        legendSettings: {
            mode: 'Range',
            toggleVisibility: false
        },
        tooltip: {
            enable: false
        },
        highlightMode: 'Point',
        highlightPattern: 'DiagonalForward',
        title: 'USA CLIMATE - WEATHER BY MONTH',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        width: Browser.isDevice ? '100%' : '75%',
    });
    chart.appendTo('#column-container');

