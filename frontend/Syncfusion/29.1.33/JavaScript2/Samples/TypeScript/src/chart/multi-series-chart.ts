import { loadCultureFiles } from '../common/culture-loader';
import { ChartTheme, Chart, StackingColumnSeries, LineSeries, Tooltip, ILoadedEventArgs, Highlight } from '@syncfusion/ej2-charts';
import { ColumnSeries, Category, Legend } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(StackingColumnSeries, LineSeries, Category, ColumnSeries, Tooltip, Legend, Highlight);

/**
 * Sample for Combination Series
 */
//tslint:disable:max-func-body-length
(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            title: 'Years',
            interval: Browser.isDevice ? 2 : 1,
            labelIntersectAction: 'Rotate45',
            valueType: 'Category',
            majorGridLines: { width: 0 }, minorGridLines: { width: 0 },
            majorTickLines: { width: 0 }, minorTickLines: { width: 0 },
            lineStyle: { width: 0 },
        },
        primaryYAxis:
        {
            title: 'Growth (in Billion)',
            minimum: -3,
            maximum: 3,
            interval: 1,
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }, majorGridLines: { width: 1 },
            minorGridLines: { width: 1 }, minorTickLines: { width: 0 },
            labelFormat: '{value}B',
        },
        chartArea: {
            border: {
                width: 0
            }
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: 1.2 }, { x: '2006', y: 1 },
                    { x: '2007', y: 1 }, { x: '2008', y: 0.25 },
                    { x: '2009', y: 0.1 }, { x: '2010', y: 1 },
                    { x: '2011', y: 0.1 }, { x: '2012', y: -0.25 },
                    { x: '2013', y: 0.25 }, { x: '2014', y: 0.6 }, { x: '2015', y: 0.9 }
                ],
                xName: 'x', yName: 'y', name: 'Private Consumption',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: 0.5 }, { x: '2006', y: 0.5 },
                    { x: '2007', y: 0.5 }, { x: '2008', y: 0.35 },
                    { x: '2009', y: 0.9 }, { x: '2010', y: 0.5 },
                    { x: '2011', y: 0.25 }, { x: '2012', y: -0.5 },
                    { x: '2013', y: 0.5 }, { x: '2014', y: 0.6 }, { x: '2015', y: 0.5 }
                ],
                xName: 'x', yName: 'y', name: 'Government Consumption',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: 0.7 }, { x: '2006', y: 1.4 },
                    { x: '2007', y: 1.5 }, { x: '2008', y: 0.35 },
                    { x: '2009', y: -2.7 }, { x: '2010', y: 0.5 },
                    { x: '2011', y: 0.25 }, { x: '2012', y: -0.1 },
                    { x: '2013', y: -0.3 }, { x: '2014', y: -0.6 }, { x: '2015', y:0 }
                ],
                xName: 'x', yName: 'y', name: 'Investment',
            }, {
                type: 'StackingColumn',
                dataSource: [
                    { x: '2005', y: -0.8 }, { x: '2006', y: 0 },
                    { x: '2007', y: -1 }, { x: '2008', y: -0.35 },
                    { x: '2009', y: -0.3 }, { x: '2010', y: -0.5 },
                    { x: '2011', y: 0 }, { x: '2012', y: -0.4 },
                    { x: '2013', y: 0 }, { x: '2014', y: -0.6 }, { x: '2015', y: -0.3 }
                ],
                xName: 'x', yName: 'y', name: 'Net Foreign Trade'
            }, {
                type: 'Line',
                dataSource: [
                    { x: '2005', y: 1.5 }, { x: '2006', y: 2.3 },
                    { x: '2007', y: 2 }, { x: '2008', y: 0.1 },
                    { x: '2009', y: -2.7 }, { x: '2010', y: 1.8 },
                    { x: '2011', y: 2 }, { x: '2012', y: 0.4 },
                    { x: '2013', y: 0.9 }, { x: '2014', y: 0.4 }, { x: '2015', y: 1.3 }
                ],
                xName: 'x', yName: 'y', name: 'GDP',
                width: 2,
                marker: {
                    visible: true,
                    width: 7,
                    height: 7
                },
            }
        ],
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Annual Growth GDP in France',
        // Enable Legend
        legendSettings: {
            visible: true, enableHighlight: true
        },
        tooltip: {
            enable: true,
            enableHighlight: true
        },
         // custom code start
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
         // custom code end
    });
    chart.appendTo('#container');
};