import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart, ScatterSeries, Legend, Tooltip, ILoadedEventArgs, ChartTheme } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { scatterData } from './scatter-data';
import { loadChartTheme } from './theme-color';
Chart.Inject(ScatterSeries, Legend, Tooltip);

/**
 * Sample for Scatter Series
 */

    
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 },
            minimum: 100,
            maximum: 220,
            edgeLabelPlacement: 'Shift',
            title: 'Height in Inches'
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            majorTickLines: {
                width: 0
            },
            minimum: 50,
            maximum: 80,
            lineStyle: {
                width: 0
            },
            title: 'Weight in Pounds',
            rangePadding: 'None'
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Scatter',
                dataSource: scatterData.getMaleData,
                xName: 'x', width: 2, marker: {
                    visible: false,
                    width: 12,
                    height: 12,
                    shape: 'Circle'
                },
                yName: 'y', name: 'Male', opacity: 0.6
            },
            {
                type: 'Scatter',
                dataSource: scatterData.getFemaleData,
                xName: 'x', width: 2, marker: {
                    visible: false,
                    width: 12,
                    height: 12,
                    shape: 'Diamond'
                },
                yName: 'y', name: 'Female', opacity: 0.6
            }
        ],

        //Initializing Chart title
        title: 'Height vs Weight',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true,
            format: 'Weight: <b>${point.x} lbs</b> <br/> Height: <b>${point.y}"</b>'
        },
        width: Browser.isDevice ? '100%' : '80%',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }

    });
    chart.appendTo('#container');
