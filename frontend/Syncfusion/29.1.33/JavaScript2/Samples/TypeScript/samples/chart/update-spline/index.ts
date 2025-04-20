import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart, SplineSeries, DateTime, DataLabel, ILoadedEventArgs, ChartTheme, IAxisRangeCalculatedEventArgs, Series } from '@syncfusion/ej2-charts';
Chart.Inject(SplineSeries, DateTime, DataLabel);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for spline updating each second.
 */
let splineData: Object[] = [
    { x: new Date(2024, 5, 6, 6, 7, 3),  y: 42 },
    { x: new Date(2024, 5, 6, 6, 7, 5),  y: 52 },
    { x: new Date(2024, 5, 6, 6, 7, 7),  y: 83 },
    { x: new Date(2024, 5, 6, 6, 7, 9),  y: 75 },
    { x: new Date(2024, 5, 6, 6, 7, 11), y: 35 },
    { x: new Date(2024, 5, 6, 6, 7, 13), y: 85 },
    { x: new Date(2024, 5, 6, 6, 7, 15), y: 78 },
    { x: new Date(2024, 5, 6, 6, 7, 17), y: 29 },
    { x: new Date(2024, 5, 6, 6, 7, 19), y: 62 },
    { x: new Date(2024, 5, 6, 6, 7, 21), y: 95 },
    { x: new Date(2024, 5, 6, 6, 7, 23), y: 32 },
    { x: new Date(2024, 5, 6, 6, 7, 25), y: 76 },
    { x: new Date(2024, 5, 6, 6, 7, 27), y: 83 },
    { x: new Date(2024, 5, 6, 6, 7, 29), y: 53 },
    { x: new Date(2024, 5, 6, 6, 7, 31), y: 32 },
    { x: new Date(2024, 5, 6, 6, 7, 33), y: 75 }
];

let intervalId: number;


    
    let chart: Chart = new Chart({
        //Initializing Primary X and Y Axis
        primaryXAxis: {
            valueType: 'DateTime', interval: 7, edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift', majorGridLines: { width: 0 },
            labelRotation: Browser.isDevice ? 45 : 0, plotOffsetRight: 30, labelIntersectAction: 'Hide'
        },
        chartArea: { border: { width: 0 } },
        primaryYAxis:
        {
            title: 'Value', interval:20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: splineData, xName: 'x', yName: 'y', type: 'Spline', width: 2,
                marker: { visible: true, isFilled: true, width: 7, height: 7 }
            }
        ],
        width: Browser.isDevice ? '100%' : '75%',
        title: 'Live data',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
            splineClearInterval();

            intervalId = setInterval(() => {
                let container = document.getElementById('spline');
                if (container) {
                    if (chart && chart.series.length > 0 && chart.series[0].dataSource) {
                        let lastDataPointIndex = splineData.length - 1;
                        if (lastDataPointIndex >= 0) {
                            let timestamp = chart.series[0].dataSource[lastDataPointIndex].x;
                            let lastTimestamp = new Date(timestamp).getTime();
                            let x = new Date(lastTimestamp + 2000);
                            let y; 
                            if (x.getSeconds() % 3 === 0) {
                                y = Math.max(30, Math.random() * 150);
                            } else if (x.getSeconds() % 2 === 0) {
                                y = Math.max(30, Math.random() * 200);
                            } else {
                                y = Math.max(30, Math.random() * 100);
                            }
                            chart.series[0].addPoint({ x: x, y: y }, 800);
                            chart.series[0].removePoint(0, 800);
                        }
                    }
                }
                else {
                    splineClearInterval();
                }
            }, 1000);
        },
        axisRangeCalculated: (args: IAxisRangeCalculatedEventArgs) => {
            if (args.axis.name === 'primaryXAxis') {
                let lastPoint: Object = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
                args.maximum = new Date(Number(lastPoint)).getTime() + 500; 
            }
        }
    });
    chart.appendTo('#spline');
    function splineClearInterval() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }

