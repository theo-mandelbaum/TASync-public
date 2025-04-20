import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, ColumnSeries, Category, Legend, DataLabel, Tooltip, Highlight,
    ILoadedEventArgs, IAxisLabelRenderEventArgs, } from '@syncfusion/ej2-charts';
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, Tooltip, Highlight);
import { Browser, EmitType } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Column Series
 */
 let labelRender: EmitType<IAxisLabelRenderEventArgs> = (args: IAxisLabelRenderEventArgs): void => {
    if (args.axis.orientation === 'Horizontal') {
        args.cancel = args.value === 2015 || args.value === 2020;
    }
};
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Double', majorGridLines: { width: 0 },
            minimum: 2015, maximum: 2020, interval: 1, majorTickLines: {width : 0},
            minorTickLines: {width: 0}
        },
        primaryYAxis:
        {
            valueType: 'Double', minimum: 0, maximum: 1200, interval: 200,
            lineStyle: { width: 0 },labelFormat: '{value}B'
        },
        chartArea: { border: { width: 0 } },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Sales', columnSpacing: 0.1,
                dataSource: [{ x: 2016, y: 1000 }, { x: 2017, y: 1170}, { x: 2018, y: 660 }, { x: 2019, y: 1030 }]
            },
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Expense', columnSpacing: 0.1,
                dataSource: [{ x: 2016, y: 400 }, { x: 2017, y: 460 }, { x: 2018, y: 1120 }, { x: 2019, y: 540 }]
            },
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y', name: 'Profit', columnSpacing: 0.1,
                dataSource: [{ x: 2016, y: 200 }, { x: 2017, y: 250 }, { x: 2018, y: 300 }, { x: 2019, y: 350 }]
            }
        ],
        //Initializing Chart title
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: { visible: true, enableHighlight: true},
        enableRtl: true,
        title: 'Company Performance', tooltip: { enable: true, enableHighlight: true },
        axisLabelRender: labelRender,
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};