import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, Tooltip, Legend, PolarSeries, Category, SplineSeries, RadarSeries, ChartDrawType, ILoadedEventArgs,
    ChartTheme, Highlight
} from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(Tooltip, Legend, PolarSeries, Category, SplineSeries, RadarSeries, Highlight);

/**
 * Sample for Polar Series with DrawType Spline
 */

    
    let cardData: Object[] = [];
    let biDirData: Object[] = [];
    let omniDirData: Object[] = [];
    let point1: Object;
    let point2: Object;

    for (let x: number = -180; x < 180; x++) {
        point1 = { x: x, y: -12.6 * (1 - Math.cos(x * 3.14 / 180)) };
        cardData.push(point1);
        point2 = { x: x, y: -3 };
        omniDirData.push(point2);
    }

    for (let x: number = -180; x < -90; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }

    for (let x: number = -90; x < 90; x++) {
        point1 = { x: x, y: -26 * (1 - Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }

    for (let x: number = 90; x < 180; x++) {
        point1 = { x: x, y: -26 * (1 + Math.cos(x * 3.14 / 180)) };
        biDirData.push(point1);
    }

    let chart: Chart = new Chart({

        //Initializing Primary X Axis
        primaryXAxis: {
            minimum: -180,
            maximum: 180,
            interval: 30,
            labelFormat: '{value}°',
            coefficient: Browser.isDevice ? 80 : 100
        },

        //Initializing Chart Series
        series: [

            {
                type: 'Polar', drawType: 'Spline', dataSource: cardData,
                animation: { enable: true }, width: 2, isClosed: false,
                xName: 'x', yName: 'y', name: 'Cardioid (unidirectional)', dashArray: '5 5 2'
            },
            {
                type: 'Polar', drawType: 'Spline', dataSource: omniDirData,
                animation: { enable: true }, dashArray: '2', width: 2,
                xName: 'x', yName: 'y', name: 'Omnidirectional', isClosed: false
            },
            {
                type: 'Polar', drawType: 'Spline', dataSource: biDirData,
                animation: { enable: true }, width: 2, isClosed: false,
                xName: 'x', yName: 'y', name: 'Bidirectional'
            },
        ],
        //Initializing Chart Title
        title: 'Microphone Types Polar Patterns',
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true,
            enableHighlight: true
        },
        legendSettings: { enableHighlight: true },
        load: (args: ILoadedEventArgs) => {
            loadChartTheme(args);
        }
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
            chart.series[0].animation.enable = false;
            chart.series[1].animation.enable = false;
            chart.series[2].animation.enable = false;
            chart.refresh();
        }
    });
    polarType.appendTo('#SelectSeriesType');
