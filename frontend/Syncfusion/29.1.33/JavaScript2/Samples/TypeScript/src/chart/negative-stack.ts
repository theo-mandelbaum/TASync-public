import { loadCultureFiles } from '../common/culture-loader';
import { Chart, DataLabel, ITooltipRenderEventArgs, StackingBarSeries, Category, Legend, Tooltip, ILoadedEventArgs, IAxisLabelRenderEventArgs, Highlight } from '@syncfusion/ej2-charts';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(StackingBarSeries, DataLabel, Category, Legend, Tooltip, Highlight);

/**
 * Sample for Negative Stack sample
 */
interface DataPoint {
    age: string;
    male: number;
    female: number;
    malePercent: string;
    femalePercent: string;
    malePercentValue: number;
    femalePercentValue: number;
};

let negativeStackData: DataPoint[] = [
    { age: '90 - 94', male: 123, female: 153, malePercent: '0.03%', femalePercent: '0.04%', malePercentValue: 0.03, femalePercentValue: -0.04 },
    { age: '85 - 89', male: 407, female: 457, malePercent: '0.1%', femalePercent: '0.11%', malePercentValue: 0.1, femalePercentValue: -0.11 },
    { age: '80 - 84', male: 879, female: 970, malePercent: '0.21%', femalePercent: '0.23%', malePercentValue: 0.21, femalePercentValue: -0.23 },
    { age: '75 - 79', male: 1609, female: 1768, malePercent: '0.39%', femalePercent: '0.42%', malePercentValue: 0.39, femalePercentValue: -0.42 },
    { age: '70 - 74', male: 2769, female: 3004, malePercent: '0.66%', femalePercent: '0.72%', malePercentValue: 0.66, femalePercentValue: -0.72 },
    { age: '65 - 69', male: 4250, female: 4511, malePercent: '1.02%', femalePercent: '1.08%', malePercentValue: 1.02, femalePercentValue: -1.08 },
    { age: '60 - 64', male: 6152, female: 6369, malePercent: '1.48%', femalePercent: '1.53%', malePercentValue: 1.48, femalePercentValue: -1.53 },
    { age: '55 - 59', male: 7741, female: 7976, malePercent: '1.86%', femalePercent: '1.91%', malePercentValue: 1.86, femalePercentValue: -1.91 },
    { age: '50 - 54', male: 9643, female: 10086, malePercent: '2.31%', femalePercent: '2.42%', malePercentValue: 2.31, femalePercentValue: -2.42 },
    { age: '45 - 49', male: 11332, female: 11585, malePercent: '2.72%', femalePercent: '2.78%', malePercentValue: 2.72, femalePercentValue: -2.78 },
    { age: '40 - 44', male: 13569, female: 13713, malePercent: '3.25%', femalePercent: '3.29%', malePercentValue: 3.25, femalePercentValue: -3.29 },
    { age: '35 - 39', male: 16293, female: 15999, malePercent: '3.91%', femalePercent: '3.84%', malePercentValue: 3.91, femalePercentValue: -3.84 },
    { age: '30 - 34', male: 18805, female: 18038, malePercent: '4.51%', femalePercent: '4.32%', malePercentValue: 4.51, femalePercentValue: -4.32 },
    { age: '25 - 29', male: 20023, female: 19216, malePercent: '4.8%', femalePercent: '4.61%', malePercentValue: 4.8, femalePercentValue: -4.61 },
    { age: '20 - 24', male: 20428, female: 19689, malePercent: '4.9%', femalePercent: '4.72%', malePercentValue: 4.9, femalePercentValue: -4.72 },
    { age: '15 - 19', male: 19663, female: 18950, malePercent: '4.71%', femalePercent: '4.54%', malePercentValue: 4.71, femalePercentValue: -4.54 },
    { age: '10 - 14', male: 18701, female: 17859, malePercent: '4.48%', femalePercent: '4.28%', malePercentValue: 4.48, femalePercentValue: -4.28 },
    { age: '05 - 09', male: 19863, female: 18942, malePercent: '4.76%', femalePercent: '4.54%', malePercentValue: 4.76, femalePercentValue: -4.54 },
    { age: '00 - 04', male: 18171, female: 17316, malePercent: '4.36%', femalePercent: '4.15%', malePercentValue: 4.36, femalePercentValue: -4.15 }
];

(window as any).default = (): void => {
    loadCultureFiles();
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            title: 'Population by Age Range',
            minimum: 0,
            interval: 3,
            majorGridLines: { width: 0 },
            majorTickLines: { width: 0 }
        },
        //Initializing Primary Y Axis
        primaryYAxis: {
            labelFormat: '{value}%',
            interval: 3,
            title: 'Share of Total Population (%)',
            lineStyle: { width: 0 },
            edgeLabelPlacement: 'Shift',
            rangePadding: 'Round',
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
        //Initializing Chart Series
        series: [
            {
                type: 'StackingBar',
                dataSource: negativeStackData,
                xName: 'age', columnWidth: 0.5,
                yName: 'femalePercentValue',
                name: 'Female',
                marker: {
                    dataLabel: {
                        name: 'femalePercent',
                        visible: true,
                        position: 'Outer',
                        font: {
                            fontWeight: '600',
                            size: '9px'
                        }
                    }
                },
                legendShape: 'Rectangle',
                cornerRadius: { bottomRight: 4, topRight: 4 }
            },
            {
                type: 'StackingBar',
                dataSource: negativeStackData,
                xName: 'age', columnWidth: 0.5,
                yName: 'malePercentValue',
                name: 'Male',
                marker: {
                    dataLabel: {
                        name: 'malePercent',
                        visible: true,
                        position: 'Outer',
                        font: {
                            fontWeight: '600',
                            size: '9px'
                        }
                    }
                },
                legendShape: 'Rectangle',
                cornerRadius: { bottomRight: 4, topRight: 4 }
            }
        ],
        //Initializing Usr Interaction Tooltip
        tooltip: {
            enable: true,
            header: '${point.x}',
            enableHighlight: true
        },
        tooltipRender: (args: ITooltipRenderEventArgs) => {
            const ageGroup: string = args.point.x as string;
            const dataPoint: DataPoint | undefined = negativeStackData.find((d: DataPoint) => d.age === ageGroup)
            if (args.text && dataPoint) {
                let value: string = '';
                if (args.series.name === 'Male') {
                    value = dataPoint.malePercent;
                } else if (args.series.name === 'Female') {
                    value = dataPoint.femalePercent;
                }
                if (value) {
                    args.text = `${args.series.name} Population: <b>${value}</b>`;
                }
            }
        },
        axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
            if (args.value < 0) {
                args.text = (-args.value + '%').toString();
            }
        },
        legendSettings: {
            enableHighlight: true,
            shapeWidth: 8,
            shapeHeight: 8
        },
        width: Browser.isDevice ? '100%' : '75%',
        //Initializing Chart title
        title: 'Belize Demographic Breakdown by Age and Gender (2024)',
        subTitle: 'Source: statisticstimes.com',
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
    });
    chart.appendTo('#container');
};