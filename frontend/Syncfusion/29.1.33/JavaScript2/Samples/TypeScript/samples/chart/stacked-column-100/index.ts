import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart, StackingColumnSeries, Category, Tooltip, Legend, ILoadedEventArgs, ILegendClickEventArgs, ITooltipRenderEventArgs, Highlight } from '@syncfusion/ej2-charts';
Chart.Inject(StackingColumnSeries, Category, Tooltip, Legend, Highlight);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for StackingColumn100 Series Sample
 */

    
    let chart: Chart = new Chart({
        //Initializing Primary X Axis
        primaryXAxis: {
            majorGridLines: { width: 0 },
            minorGridLines: { width: 0 },
            majorTickLines: { width: 0 },
            minorTickLines: { width: 0 },
            interval: 1,
            lineStyle: { width: 0 },
            labelIntersectAction: 'Rotate45',
            valueType: 'Category'
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 0 },
            interval: 20
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
                dataSource: Browser.isDevice ?
                    [
                        { x: '2021', y: 24300000 },
                        { x: '2022', y: 26300000 },
                        { x: '2023', y: 25400000 },
                        { x: '2024', y: 25000000 }
                    ] :
                    [
                        { x: '2019', y: 28500000 },
                        { x: '2020', y: 27500000 },
                        { x: '2021', y: 24300000 },
                        { x: '2022', y: 26300000 },
                        { x: '2023', y: 25400000 },
                        { x: '2024', y: 25000000 }
                    ], 
                xName: 'x', yName: 'y', type: 'StackingColumn100', legendShape: 'Rectangle',
                name: 'India', columnWidth: 0.4, border: { width: 1, color: "white" }
            },
            {
                dataSource: Browser.isDevice ?
                    [
                        { x: '2021', y: 26700000 },
                        { x: '2022', y: 30800000 },
                        { x: '2023', y: 27400000 },
                        { x: '2024', y: 31000000 }
                    ] :
                    [
                        { x: '2019', y: 26900000 },
                        { x: '2020', y: 29300000 },
                        { x: '2021', y: 26700000 },
                        { x: '2022', y: 30800000 },
                        { x: '2023', y: 27400000 },
                        { x: '2024', y: 31000000 }
                    ], 
                xName: 'x', yName: 'y', legendShape: 'Rectangle',
                type: 'StackingColumn100', name: 'China', columnWidth: 0.4, border: { width: 1, color: "white" }
            },
            {
                dataSource: Browser.isDevice ?
                    [
                        { x: '2021', y: 17500000 },
                        { x: '2022', y: 14500000 },
                        { x: '2023', y: 12100000 },
                        { x: '2024', y: 14400000 }
                    ] :
                    [
                        { x: '2019', y: 19900000 },
                        { x: '2020', y: 14600000 },
                        { x: '2021', y: 17500000 },
                        { x: '2022', y: 14500000 },
                        { x: '2023', y: 12100000 },
                        { x: '2024', y: 14400000 }
                    ], 
                xName: 'x', yName: 'y', legendShape: 'Rectangle',
                type: 'StackingColumn100', name: 'United States', columnWidth: 0.4, border: { width: 1, color: "white" }
            },
            {
                dataSource: Browser.isDevice ?
                    [
                        { x: '2021', y: 10800000 },
                        { x: '2022', y: 11700000 },
                        { x: '2023', y: 14600000 },
                        { x: '2024', y: 17000000 }
                    ] :
                    [
                        { x: '2019', y: 13000000 },
                        { x: '2020', y: 13800000 },
                        { x: '2021', y: 10800000 },
                        { x: '2022', y: 11700000 },
                        { x: '2023', y: 14600000 },
                        { x: '2024', y: 17000000 }
                    ], 
                xName: 'x', yName: 'y', legendShape: 'Rectangle', cornerRadius: { topLeft: 4, topRight: 4 },
                type: 'StackingColumn100', name: 'Brazil', columnWidth: 0.4, border: { width: 1, color: "white" }
            }
        ],
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        },
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart Title
        title: Browser.isDevice ? 'Global Cotton Production by Country (2021–2024)' : 'Global Cotton Production by Country (2019–2024)',
        subTitle: 'Source: fas.usda.gov',
        legendSettings: {
            enableHighlight: true,
            shapeWidth: 9,
            shapeHeight: 9
        },
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true,
            enableHighlight: true,
            header: '<b>${point.x}</b>'
        },
        legendClick: (args: ILegendClickEventArgs) => {
            if (args.series.index === 0) {
                if (args.chart.series[3].visible) {
                    args.chart.series[3].cornerRadius.topLeft = 4;
                    args.chart.series[3].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[2].visible) {
                    args.chart.series[2].cornerRadius.topLeft = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[1].visible) {
                    args.chart.series[1].cornerRadius.topLeft = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else {
                    args.chart.series[0].cornerRadius.topLeft = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                }
            }

            if (args.series.index === 1) {
                if (args.chart.series[3].visible) {
                    args.chart.series[3].cornerRadius.topLeft = 4;
                    args.chart.series[3].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                } else if (args.chart.series[2].visible) {
                    args.chart.series[2].cornerRadius.topLeft = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                } else if (args.series.visible && args.chart.series[0].visible) {
                    args.chart.series[0].cornerRadius.topLeft = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                } else {
                    args.chart.series[1].cornerRadius.topLeft = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                }
            }

            if (args.series.index === 2) {
                if (args.chart.series[3].visible) {
                    args.chart.series[3].cornerRadius.topLeft = 4;
                    args.chart.series[3].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.topLeft = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                } else if (!args.series.visible) {
                    args.chart.series[2].cornerRadius.topLeft = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[1].visible) {
                    args.chart.series[1].cornerRadius.topLeft = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.topLeft = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                } else if (args.series.visible && args.chart.series[0].visible) {
                    args.chart.series[0].cornerRadius.topLeft = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.topLeft = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                }
            }

            if (args.series.index === 3) {
                if (!args.series.visible) {
                    args.chart.series[3].cornerRadius.topLeft = 4;
                    args.chart.series[3].cornerRadius.topRight = 4;
                    args.chart.series[2].cornerRadius.topLeft = 0;
                    args.chart.series[2].cornerRadius.topRight = 0;
                    args.chart.series[1].cornerRadius.topLeft = 0;
                    args.chart.series[1].cornerRadius.topRight = 0;
                    args.chart.series[0].cornerRadius.topLeft = 0;
                    args.chart.series[0].cornerRadius.topRight = 0;
                } else if (args.chart.series[2].visible) {
                    args.chart.series[2].cornerRadius.topLeft = 4;
                    args.chart.series[2].cornerRadius.topRight = 4;
                    args.chart.series[3].cornerRadius.topLeft = 0;
                    args.chart.series[3].cornerRadius.topRight = 0;
                } else if (args.chart.series[1].visible) {
                    args.chart.series[1].cornerRadius.topLeft = 4;
                    args.chart.series[1].cornerRadius.topRight = 4;
                    args.chart.series[3].cornerRadius.topLeft = 0;
                    args.chart.series[3].cornerRadius.topRight = 0;
                } else if (args.series.visible && args.chart.series[0].visible) {
                    args.chart.series[0].cornerRadius.topLeft = 4;
                    args.chart.series[0].cornerRadius.topRight = 4;
                    args.chart.series[3].cornerRadius.topLeft = 0;
                    args.chart.series[3].cornerRadius.topRight = 0;
                }
            }
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            if (args.text) {
                let value: string = args.point.y.toLocaleString('en-US');
                args.text = `${args.series.name}: <b>${value}M (${args.point.percentage}%)</b>`;
            }
        }
    });
    chart.appendTo('#container');
