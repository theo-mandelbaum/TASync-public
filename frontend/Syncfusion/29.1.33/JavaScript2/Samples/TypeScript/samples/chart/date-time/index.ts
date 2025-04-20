import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { ChartTheme, Chart, LineSeries, DateTime, Legend, DataLabel, ILoadedEventArgs } from '@syncfusion/ej2-charts';
Chart.Inject(LineSeries, DateTime, Legend, DataLabel);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for DateTime Axis
 */

    
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'DateTime',
            labelFormat: 'MMM d',
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        },
        primaryYAxis:
        {
            minimum: -20,
            maximum: 30,
            interval: 10,
            edgeLabelPlacement: 'Shift',
            labelFormat: '{value}°C',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }
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
                dataSource: [
                    { x: new Date(2016, 3, 1), y: 6.3 },
                    { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
                    { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
                    { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Warmest',
                marker: {
                    visible: true,
                    height: 8, width: 8,
                    shape: 'Pentagon',isFilled: true,
                    dataLabel: { visible: true, position: 'Top' }
                }
            }, {
                type: 'Line',
                dataSource: [
                    { x: new Date(2016, 3, 1), y: -5.3 },
                    { x: new Date(2016, 4, 1), y: 1.0 }, { x: new Date(2016, 5, 1), y: 6.9 },
                    { x: new Date(2016, 6, 1), y: 9.4 }, { x: new Date(2016, 7, 1), y: 7.6 },
                    { x: new Date(2016, 8, 1), y: 2.6 }, { x: new Date(2016, 9, 1), y: -4.9 }
                ],
                xName: 'x', width: 2,
                yName: 'y', name: 'Coldest',
                marker: {
                    visible: true, height: 8, width: 8, shape: 'Diamond',isFilled: true,
                    dataLabel: { visible: true, position: 'Top' }
                }
            }
        ],
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Alaska Weather Statistics - 2016',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
