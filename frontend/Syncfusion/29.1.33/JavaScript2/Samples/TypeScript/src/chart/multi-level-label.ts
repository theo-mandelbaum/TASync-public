import { loadCultureFiles } from '../common/culture-loader';
import {
    Chart, DataLabel, ColumnSeries, Category, ILoadedEventArgs,
    ChartTheme, MultiLevelLabel
} from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme, pointRender } from './theme-color';
Chart.Inject(ColumnSeries, Category, DataLabel, MultiLevelLabel);


/**
 * Sample for Smart Axis Labels
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category', labelRotation: 90, labelIntersectAction : Browser.isDevice ? 'Rotate90' : 'Trim',
            border: { width: 1, type: 'Rectangle' },
            isIndexed: true, interval: 1, majorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            multiLevelLabels : (Browser.isDevice ? ([
                {
                    border: { type: 'Rectangle' },
                    categories: [
                        { start: -0.5, end: 2.5, text: 'In Season', },
                        { start: 2.5, end: 5.5, text: 'Out of Season', },
                        { start: 5.5, end: 7.5, text: 'In Season', },
                        { start: 7.5, end: 9.5, text: 'Out of Season', },
                    ]
                }, {
                    border: { type: 'Rectangle' },
                    textStyle: { fontWeight: 'Bold' },
                    categories: [
                        { start: -0.5, end: 5.5, text: 'Fruits', },
                        { start: 5.5, end: 9.5, text: 'Vegetables', },
                    ]
                }]) : [
                    {
                        border: { type: 'Rectangle' },
                        categories: [
                            { start: -0.5, end: 0.5, text: 'Seedless', },
                            { start: 0.5, end: 2.5, text: 'Seeded', },
                            { start: 2.5, end: 3.5, text: 'Seedless', },
                            { start: 3.5, end: 5.5, text: 'Seeded', },
                            { start: 5.5, end: 6.5, text: 'Seedless', },
                            { start: 6.5, end: 7.5, text: 'Seeded', },
                            { start: 7.5, end: 8.5, text: 'Seedless', },
                            { start: 8.5, end: 9.5, text: 'Seeded', }
                        ]
                    }, {
                        border: { type: 'Rectangle' },
                        categories: [
                            { start: -0.5, end: 2.5, text: 'In Season', },
                            { start: 2.5, end: 5.5, text: 'Out of Season', },
                            { start: 5.5, end: 7.5, text: 'In Season', },
                            { start: 7.5, end: 9.5, text: 'Out of Season', },
                        ]
                    }, {
                        border: { type: 'Rectangle' },
                        textStyle: { fontWeight: 'Bold' },
                        categories: [
                            { start: -0.5, end: 5.5, text: 'Fruits', },
                            { start: 5.5, end: 9.5, text: 'Vegetables', },
                        ]
                    }])
        },
        chartArea: {
            border: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis:
            {
                minimum: 0, maximum: 120, interval: 30,
                majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
            },

        //Initializing Chart Series
        series: [
            {
                type: 'Column', xName: 'x', yName: 'y',
                dataSource: [
                    { x: 'Grapes', y: 28 }, { x: 'Apples', y: 87 },
                    { x: 'Pears', y: 42 }, { x: 'Grapes', y: 13 },
                    { x: 'Apples', y: 13 }, { x: 'Pears', y: 10 },
                    { x: 'Tomato', y: 31 }, { x: 'Potato', y: 96 },
                    { x: 'Cucumber', y: 41 }, { x: 'Onion', y: 59 }],
                marker: {
                    dataLabel: {
                        visible: true, position: 'Outer'
                    }
                }
            },
        ],
        //Initializing Chart title
        title: 'Fruits and Vegetables - Season',
        pointRender: pointRender,
        legendSettings: { visible: false },
        width: Browser.isDevice ? '100%' : '75%',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};