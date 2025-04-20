import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);


import { Chart, ColumnSeries, Category, DataLabel, ILoadedEventArgs, IAxisRangeCalculatedEventArgs, ITextRenderEventArgs, sort, ChartTheme } from '@syncfusion/ej2-charts';
import { loadChartTheme, pointRender } from './theme-color';
import { Browser } from '@syncfusion/ej2-base';
Chart.Inject(ColumnSeries, Category, DataLabel);

let intervalId: number;

let updatedData: Object[] = [
    { x: 'India', y: 97.21 },
    { x: 'France', y: 95.21 },
    { x: 'Indonesia', y: 62.74 },
    { x: 'Iceland', y: 61.71 },
    { x: 'United States', y: 57.97 },
    { x: 'Greece', y: 57.51 },
    { x: 'Iran', y: 55.31 },
    { x: 'Canada', y: 48.76 },
    { x: 'Finland', y: 48.50 },
    { x: 'Brazil', y: 45.13 },

];
let updatedData2: Object[] = [
    { x: 'India', y: 102.54 },
    { x: 'France', y: 90.76 },
    { x: 'Indonesia', y: 64.61 },
    { x: 'Iceland', y: 70.95 },
    { x: 'United States', y: 61.52 },
    { x: 'Greece', y: 49.03 },
    { x: 'Iran', y: 33.05 },
    { x: 'Canada', y: 59.83 },
    { x: 'Finland', y: 43.13 },
    { x: 'Brazil', y: 55.56 },
];
let updatedData3: Object[] = [
    { x: 'India', y: 99.33 },
    { x: 'France', y: 94.50 },
    { x: 'Indonesia', y: 64.86 },
    { x: 'Iceland', y: 77.86 },
    { x: 'United States', y: 62.14 },
    { x: 'Greece', y: 47.73 },
    { x: 'Iran', y: 39.97 },
    { x: 'Canada', y: 66.53 },
    { x: 'Finland', y: 43.15 },
    { x: 'Brazil', y: 50.02 }
];
let updatedData4: Object[] = [
    { x: 'India', y: 98.85 },
    { x: 'France', y: 101.11 },
    { x: 'Indonesia', y: 60.72 },
    { x: 'Iceland', y: 71.09 },
    { x: 'United States', y: 60.97 },
    { x: 'Greece', y: 52.07 },
    { x: 'Iran', y: 37.99 },
    { x: 'Canada', y: 58.35 },
    { x: 'Finland', y: 43.41 },
    { x: 'Brazil', y: 58.61 }
];
let updatedData5: Object[] = [
    { x: 'India', y: 100.02 },
    { x: 'France', y: 100.55 },
    { x: 'Indonesia', y: 62.84 },
    { x: 'Iceland', y: 89.05 },
    { x: 'United States', y: 59.46 },
    { x: 'Greece', y: 54.04 },
    { x: 'Iran', y: 42.58 },
    { x: 'Canada', y: 59.90 },
    { x: 'Finland', y: 46.18 },
    { x: 'Brazil', y: 65.06 }
];
let updatedData6: Object[] = [
    { x: 'India', y: 102.54 },
    { x: 'France', y: 103.56 },
    { x: 'Indonesia', y: 60.23 },
    { x: 'Iceland', y: 94.00 },
    { x: 'United States', y: 59.39 },
    { x: 'Greece', y: 50.11 },
    { x: 'Iran', y: 34.23 },
    { x: 'Canada', y: 60.40 },
    { x: 'Finland', y: 44.73 },
    { x: 'Brazil', y: 50.04 }
];
let updatedData7: Object[] = [
    { x: 'India', y: 98.84 },
    { x: 'France', y: 101.95 },
    { x: 'Indonesia', y: 60.86 },
    { x: 'Iceland', y: 89.51 },
    { x: 'United States', y: 58.26 },
    { x: 'Greece', y: 53.20 },
    { x: 'Iran', y: 34.28 },
    { x: 'Canada', y: 57.22 },
    { x: 'Finland', y: 42.99 },
    { x: 'Brazil', y: 51.68 }
];
let updatedData8: Object[] = [
    { x: 'India', y: 100.41 },
    { x: 'France', y: 108.54 },
    { x: 'Indonesia', y: 56.44 },
    { x: 'Iceland', y: 107.98 },
    { x: 'United States', y: 57.75 },
    { x: 'Greece', y: 56.34 },
    { x: 'Iran', y: 35.53 },
    { x: 'Canada', y: 57.49 },
    { x: 'Finland', y: 43.32 },
    { x: 'Brazil', y: 64.56 }
];
let updatedData9: Object[] = [
    { x: 'India', y: 104.45 },
    { x: 'France', y: 102.07 },
    { x: 'Indonesia', y: 61.19 },
    { x: 'Iceland', y: 97.05 },
    { x: 'United States', y: 59.53 },
    { x: 'Greece', y: 55.61 },
    { x: 'Iran', y: 41.84 },
    { x: 'Canada', y: 64.13 },
    { x: 'Finland', y: 43.69 },
    { x: 'Brazil', y: 64.73 }
];
let updatedData10: Object[] = [
    { x: 'India', y: 111.84 },
    { x: 'France', y: 95.53 },
    { x: 'Indonesia', y: 55.15 },
    { x: 'Iceland', y: 85.79 },
    { x: 'United States', y: 59.53 },
    { x: 'Greece', y: 58.93 },
    { x: 'Iran', y: 46.53 },
    { x: 'Canada', y: 59.52 },
    { x: 'Finland', y: 45.67 },
    { x: 'Brazil', y: 67.84 }
];

let yearIndex: number = 2;


    
    let chart: Chart = new Chart({
        primaryXAxis: {
            valueType: 'Category',
            majorGridLines: { width: 0 },
            border: { width: 0 },
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            labelRotation: -90,
            labelIntersectAction:'None',
            interval: 1

        },
        primaryYAxis: {
            interval: 30,
            title: 'Nitrogen Fertilizer Use (KG/Ha)',
            labelFormat: '{value}',
            border: { width: 0 },
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 }

        },
        series: [{
            dataSource: updatedData,
            xName: 'x', yName: 'y',
            type: 'Column', animation: { enable: true },
            marker: { visible: false, dataLabel: { visible: true, position: 'Top', format: '{value}', enableRotation: Browser.isDevice?true: false, angle : -90, font: { color: '#ffffff' } } },
            cornerRadius: { topLeft: 5, topRight: 5 }, columnWidth: 0.7
        },
        ],
        chartArea: { border: { width: 0 } },
        title: 'Nitrogen Fertilizer Usage',
        pointRender: pointRender,
        width: Browser.isDevice ? '100%' : '75%',
        textRender: (args: ITextRenderEventArgs) => {
            if (Browser.isDevice) {
                args.series.marker.dataLabel.font.size = '10px'
            }
        },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
            updateClearInterval();
            intervalId = setInterval(function () {
                let container: HTMLElement = document.getElementById('data-sorting-container');
                if (container && container.id === args.chart.element.id) {
                    let newData: Object[] = (eval('updatedData' + yearIndex) || []).map(function (item: { x: string; y: number; }) {
                        return { x: item.x, y: item.y };
                    });
                    if (chart.series.length > 0) {
                        let newSource: Object[] = sort(newData, ['y'], true);
                        chart.series[0].setData(newSource, 1400);
                    }
                    yearIndex = yearIndex < 10 ? yearIndex + 1 : 2;
                }
                else {
                    updateClearInterval();
                }
            }, 2000);
        },

        axisRangeCalculated: (args: IAxisRangeCalculatedEventArgs) => {
            if (args.axis.name === 'primaryYAxis') {
                if (args.maximum > 120) {
                    args.interval = 30;
                }
                else {
                    args.interval = 20;
                }
                if (args.maximum > 150) {
                    args.maximum = 150;
                }
            }
        }
    }, '#data-sorting-container');

    function updateClearInterval() {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
    }





