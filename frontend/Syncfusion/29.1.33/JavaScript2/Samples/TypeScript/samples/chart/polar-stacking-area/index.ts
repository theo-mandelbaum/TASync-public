import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, Tooltip, Legend, PolarSeries, Category, StackingAreaSeries, RadarSeries, ChartDrawType, ILoadedEventArgs, ChartTheme, Highlight
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(Tooltip, Legend, PolarSeries, Category, StackingAreaSeries, RadarSeries, Highlight);

/**
 * Sample for Polar Series with DrawType StackingArea
 */

    
    let data: Object[] = [
        // {x: 'China', y: 9635, y1: 10535, y2: 11226, y3: 11218},
        { x: 'JPN', text: 'Japan', y: 5156, y1: 4849, y2: 4382, y3: 4939 },
        { x: 'DEU', text: 'Germany', y: 3754, y1: 3885, y2: 3365, y3: 3467 },
        { x: 'FRA', text: 'France', y: 2809, y1: 2844, y2: 2420, y3: 2463 },
        { x: 'GBR', text: Browser.isDevice ? 'UK' : 'United Kingdom', y: 2721, y1: 3002, y2: 2863, y3: 2629 },
        { x: 'BRA', text: 'Brazil', y: 2472, y1: 2456, y2: 1801, y3: 1799 },
        { x: 'RUS', text: 'Russia', y: 2231, y1: 2064, y2: 1366, y3: 1281 },
        { x: 'ITA', text: 'Italy', y: 2131, y1: 2155, y2: 1826, y3: 1851 },
        { x: 'IND', text: 'India', y: 1857, y1: 2034, y2: 2088, y3: 2256 },
        { x: 'CAN', text: 'Canada', y: 1843, y1: 1793, y2: 1553, y3: 1529 }
    ];
    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'OnTicks',
            interval: 1,
            coefficient: Browser.isDevice ? 80 : 100
        },

        //Initializing Chart Series
        series: [
            {
                type: 'Polar', drawType: 'StackingArea', dataSource: data,
                animation: { enable: true },
                xName: 'text', yName: 'y', name: '2013'
            },
            {
                type: 'Polar', drawType: 'StackingArea', dataSource: data,
                animation: { enable: true },
                xName: 'text', yName: 'y1', name: '2014'
            },
            {
                type: 'Polar', drawType: 'StackingArea', dataSource: data,
                animation: { enable: true },
                xName: 'text', yName: 'y2', name: '2015'
            },
            {
                type: 'Polar', drawType: 'StackingArea', dataSource: data,
                animation: { enable: true },
                xName: 'text', yName: 'y3', name: '2016'
            },
        ],
        //Initializing Chart Sample
        title: 'GDP in Current Prices (USD Billions)',
        legendSettings: {
            visible: true, enableHighlight: true
        },
        //Initializing User Interaction Tooltip
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
    let polarType: DropDownList = new DropDownList({
        index: 0,
        placeholder: 'Select Range Bar Color',
        width: 120,
        change: () => {
            chart.series[0].type = <ChartDrawType>polarType.value;
            chart.series[1].type = <ChartDrawType>polarType.value;
            chart.series[2].type = <ChartDrawType>polarType.value;
            chart.series[3].type = <ChartDrawType>polarType.value;
            chart.series[0].animation.enable = false;
            chart.series[1].animation.enable = false;
            chart.series[2].animation.enable = false;
            chart.series[3].animation.enable = false;
            chart.refresh();
        }
    });
    polarType.appendTo('#SelectSeriesType');
