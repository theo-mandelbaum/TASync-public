import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart, LineSeries, Category, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, Category, Legend, Tooltip);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Chart Symbols
 */

    
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            title: 'Countries', valueType: 'Category',
            interval: 1, labelIntersectAction: 'Rotate45',
            majorGridLines: { width: 0 }, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
        },

        //Initializing Primary Y Axis
        primaryYAxis:
        {
            title: 'Penetration', rangePadding: 'None',
            labelFormat: '{value}%', minimum: 0,
            lineStyle: { width: 0},
            maximum: 75, interval: 15
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Line',
                dataSource: [{ x: 'WW', y: 12, text: 'World Wide' },
                { x: 'EU', y: 9.9, text: 'Europe' },
                { x: 'APAC', y: 4.4, text: 'Asia Pacific' },
                { x: 'LATAM', y: 6.4, text: 'Latin America' },
                { x: 'MEA', y: 30, text: 'Middle East Africa' },
                { x: 'NA', y: 25.3, text: 'North America' }],
                name: 'December 2007',
                marker: {
                    visible: true, width: 10, height: 10,
                    shape: 'Diamond', dataLabel: { name: 'text' }
                },
                xName: 'x', width: 2,
                yName: 'y',
            },
            {
                type: 'Line',
                dataSource: [{ x: 'WW', y: 22, text: 'World Wide' },
                { x: 'EU', y: 26, text: 'Europe' },
                { x: 'APAC', y: 9.3, text: 'Asia Pacific' },
                { x: 'LATAM', y: 28, text: 'Latin America' },
                { x: 'MEA', y: 45.7, text: 'Middle East Africa' },
                { x: 'NA', y: 35.9, text: 'North America' }],
                xName: 'x', width: 2,
                marker: {
                    visible: true, width: 10, height: 10,
                    shape: 'Pentagon', dataLabel: { name: 'text' }
                },
                yName: 'y', name: 'December 2008',
            },
            {
                type: 'Line',
                dataSource: [{ x: 'WW', y: 38.3, text: 'World Wide' },
                { x: 'EU', y: 45.2, text: 'Europe' },
                { x: 'APAC', y: 18.2, text: 'Asia Pacific' },
                { x: 'LATAM', y: 46.7, text: 'Latin America' },
                { x: 'MEA', y: 61.5, text: 'Middle East Africa' },
                { x: 'NA', y: 64, text: 'North America' }],
                xName: 'x', width: 2,
                marker: {
                    visible: true,
                    width: 10, height: 10,
                    shape: 'Triangle',
                    dataLabel: { name: 'text' }
                },
                yName: 'y', name: 'December 2009',
            }
        ],
        //Initializing Chart title
        title: 'FB Penetration of Internet Audience',
        legendSettings: { visible: false },
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true,
            showNearestTooltip: true,
            enableHighlight: true
        },
        width : Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
