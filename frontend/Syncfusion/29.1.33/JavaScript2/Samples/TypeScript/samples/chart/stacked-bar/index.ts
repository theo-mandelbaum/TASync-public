import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart, StackingBarSeries, Category, Legend, Tooltip, ILoadedEventArgs, DataLabel, ILegendClickEventArgs, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(StackingBarSeries, Category, Legend, Tooltip, Highlight, DataLabel);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for StackedBar Series
 */

    
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },
        chartArea: {
            border: {
                width: 0
            },
            margin: {
                bottom: 12
            }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            maximum: 3500,
            labelFormat: '{value}TWh',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            edgeLabelPlacement: 'Shift'
        },
        //Initializing Chart Series
        series: [
            {
                type: 'StackingBar',
                dataSource: [
                    { x: '2020', y: 466 },
                    { x: '2021', y: 656 },
                    { x: '2022', y: 763 },
                    { x: '2023', y: 886 }
                ],
                name: 'Wind',
                xName: 'x',
                yName: 'y',
                border: { width: 1, color: "white" },
                columnWidth: 0.6,
                marker: { dataLabel: { visible: true } },
                legendShape: 'Rectangle'
            },
            {
                type: 'StackingBar',
                dataSource: [
                    { x: '2020', y: 261 },
                    { x: '2021', y: 327 },
                    { x: '2022', y: 427 },
                    { x: '2023', y: 584 }
                ],
                name: 'Solar',
                xName: 'x',
                yName: 'y',
                border: { width: 1, color: "white" },
                columnWidth: 0.6,
                marker: { dataLabel: { visible: true } },
                legendShape: 'Rectangle'
            },
            {
                type: 'StackingBar',
                dataSource: [
                    { x: '2020', y: 1355 },
                    { x: '2021', y: 1340 },
                    { x: '2022', y: 1352 },
                    { x: '2023', y: 1286 }
                ],
                name: 'Hydro',
                xName: 'x',
                yName: 'y',
                border: { width: 1, color: "white" },
                columnWidth: 0.6,
                marker: { dataLabel: { visible: true } },
                legendShape: 'Rectangle',
                cornerRadius: { bottomRight: 4, topRight: 4 }
            }
        ],

        //Initializing Chart title
        title: 'Annual Renewable Energy Generation in China (2020–2023) by Source',
        subTitle: 'Source: wikipedia.org',
        tooltip: {
            enable: true,
            enableHighlight: true,
            header: '<b>Renewable Energy Generation</b>',
            format: '${series.name} : <b>${point.y}</b>'
        },
        width: Browser.isDevice ? '100%' : '75%',
        legendSettings: {
            enableHighlight: true,
            shapeWidth: 9,
            shapeHeight: 9
        },
        stackLabels: {
            visible: true,
            format: '{value}TWh'
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        legendClick: (args: ILegendClickEventArgs) => {
            if (args.series.index === 0) {
                if (args.chart.series[2].visible) {
                    args.chart.series[2].cornerRadius.bottomRight = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.bottomRight = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[1].visible) {
                    args.chart.series[1].cornerRadius.bottomRight = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.bottomRight = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else {
                    args.chart.series[0].cornerRadius.bottomRight = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                }
            }
            if (args.series.index === 1) {
                if (args.chart.series[2].visible) {
                    args.chart.series[2].cornerRadius.bottomRight = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.bottomRight = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                } else if (args.series.visible && args.chart.series[0].visible) {
                    args.chart.series[0].cornerRadius.bottomRight = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.bottomRight = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                } else {
                    args.chart.series[1].cornerRadius.bottomRight = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.bottomRight = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                }
            }

            if (args.series.index === 2) {
                if (!args.series.visible) {
                    args.chart.series[2].cornerRadius.bottomRight = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.bottomRight = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                    args.chart.series[0].cornerRadius.bottomRight = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[1].visible) {
                    args.chart.series[1].cornerRadius.bottomRight = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.bottomRight = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                } else if (args.series.visible && args.chart.series[0].visible) {
                    args.chart.series[0].cornerRadius.bottomRight = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.bottomRight = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                }
            }
        }
    });
    chart.appendTo('#container');
