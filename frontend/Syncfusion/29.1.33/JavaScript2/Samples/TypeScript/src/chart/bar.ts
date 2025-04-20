import { loadCultureFiles } from '../common/culture-loader';
import { Chart, DataLabel, BarSeries, Category, Legend, Tooltip, ILoadedEventArgs, Highlight } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(BarSeries, DataLabel, Category, Legend, Tooltip, Highlight);

/**
 * Sample for bar series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },
        primaryYAxis:
        {
            labelFormat: '{value}M',
            title: 'Units Sold (in Millions)',
            maximum: 300,
            edgeLabelPlacement: 'Shift',
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            },
            margin: {
                bottom: 12
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Bar',
                dataSource: [
                    { year: '2021', count: 237 },
                    { year: '2022', count: 226.4 },
                    { year: '2023', count: 234.6 }

                ],
                xName: 'year', cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle',
                yName: 'count', name: 'Apple', columnSpacing: 0.3,
            },
            {
                type: 'Bar',
                dataSource: [
                    { year: '2021', count: 190 },
                    { year: '2022', count: 153.1 },
                    { year: '2023', count: 145.9 }
                ],
                xName: 'year', cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle',
                yName: 'count', name: "Xiaomi", columnSpacing: 0.3,
            },
            {
                type: 'Bar',
                dataSource: [
                    { year: '2021', count: 143 },
                    { year: '2022', count: 103.3 },
                    { year: '2023', count: 103.1 }
                ],
                xName: 'year', cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle',
                yName: 'count', name: "Oppo", columnSpacing: 0.3,
            }
        ],
        // Initializing the tooltip
        tooltip: {
            enable: true,
            enableHighlight: true,
            header: '<b>${series.name}</b>',
            format: '${point.x} : <b>${point.y}</b>'
        },
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: { enableHighlight: true, shapeWidth: 9, shapeHeight: 9 },
        //Initializing Chart title
        title: 'Global Smartphone Sales Trends by Brand (2021-2023)',
        subTitle: 'Source: wikipedia.org',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};