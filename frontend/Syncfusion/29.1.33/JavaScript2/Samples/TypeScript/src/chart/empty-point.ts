import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, ColumnSeries, ChartTheme, SplineSeries, SplineAreaSeries, ChartSeriesType,
    EmptyPointMode, Category, Legend, Tooltip, ILoadedEventArgs
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2/base';
import { loadChartTheme } from './theme-color';
Chart.Inject(ColumnSeries, Category, Legend, Tooltip, SplineSeries, SplineAreaSeries);

/**
 * Sample for Empty Points
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'Category', interval: 1, labelIntersectAction: Browser.isDevice ? 'None' : 'Rotate45', labelRotation: Browser.isDevice ? -45 : 0, majorTickLines: { width: 0 },
            minorTickLines: { width: 0 }, title: 'Product'
        },
        primaryYAxis:
        {
           minimum: 0, maximum: 100, interval: 20, labelFormat: '{value}%', title: 'Profit'
        },
        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', width: 2, yName: 'y',
                dataSource: [
                    { x: 'Rice', y: 80 }, { x: 'Wheat', y: null }, { x: 'Oil', y: 70 },
                    { x: 'Corn', y: 60 }, { x: 'Gram', y: null },
                    { x: 'Milk', y: 70 }, { x: 'Peas', y: 80 },
                    { x: 'Fruit', y: 60 }, { x: 'Butter', y: null }
                ],
                marker: { visible: false, height: 7, width: 7 },
                emptyPointSettings: {
                    fill: '#e6e6e6',
                }
            },
        ],
        legendSettings: { visible: false },
        //Initializing Chart title
        title: 'Annual Product-Wise Profit Analysis',
        // Tooltip initialized
        tooltip: { enable: true, enableMarker: false },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
    let mode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].emptyPointSettings.mode = <EmptyPointMode>mode.value;
            chart.refresh();
        }
    });
    mode.appendTo('#emptypointmode');
    let edgeMode: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartSeriesType>edgeMode.value;
            if(edgeMode.value === 'Spline'){
                chart.series[0].marker.visible = true;
            }
            else {
                chart.series[0].marker.visible = false;
            }
            chart.refresh();
        }
    });
    edgeMode.appendTo('#SelectSeriesType');
};