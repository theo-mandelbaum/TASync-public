import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { Chart3D, StackingColumnSeries3D, Category3D, Tooltip3D, Legend3D, Chart3DLoadedEventArgs, Highlight3D, ChartTheme } from '@syncfusion/ej2-charts';
Chart3D.Inject(StackingColumnSeries3D, Category3D, Tooltip3D, Legend3D, Highlight3D);
import { Browser } from '@syncfusion/ej2-base';
import { load3DChartTheme } from './theme-color';
let chartData: any[] = [
    { x: '2013', y: 9628912, y1: 4298390, y2: 2842133, y3: 2006366 },
    { x: '2014', y: 9609326, y1: 4513769, y2: 3016710, y3: 2165566 },
    { x: '2015', y: 7485587, y1: 4543838, y2: 3034081, y3: 2279503 },
    { x: '2016', y: 7793066, y1: 4999266, y2: 2945295, y3: 2359756 },
    { x: '2017', y: 6856880, y1: 5235842, y2: 3302336, y3: 2505741 }
];

/**
 * Sample for StackingColumn100 Series Sample
 */

    
    let chart: Chart3D = new Chart3D({
        //Initializing Primary X Axis
        primaryXAxis: {
            valueType: 'Category',
            labelPlacement: 'BetweenTicks'
        },
        //Initializing Primary Y Axis
        primaryYAxis:
        {
            rangePadding: 'None',
            interval: Browser.isDevice ? 25 : 20
        },
        //Initializing Chart Series
        series: [
            {
                dataSource: chartData, xName: 'x', yName: 'y',
                type: 'StackingColumn100',
                name: 'General Motors', columnWidth: 0.5
            }, {
                dataSource: chartData, xName: 'x', yName: 'y1',
                type: 'StackingColumn100', name: 'Honda', columnWidth: 0.5
            }, {
                dataSource: chartData, xName: 'x', yName: 'y2',
                type: 'StackingColumn100', name: 'Suzuki', columnWidth: 0.5

            }, {
                dataSource: chartData, xName: 'x', yName: 'y3',
                type: 'StackingColumn100', name: 'BMW', columnWidth: 0.5

            }
        ],
        load: (args: Chart3DLoadedEventArgs) => {
            load3DChartTheme(args);
        },
        width: Browser.isDevice ? '100%' : '75%',
        enableRotation: true,
        rotation: 7,
        tilt: 10,
        depth: 100,
        height: '400',
        wallColor: 'transparent',
        title: 'Motor Vehicle Production by Manufacturer',
        legendSettings: {
            enableHighlight: true
        },
        //Initializing User Interaction Tooltip
        tooltip: {
            enable: true, format: '${point.x} : <b>${point.y} (${point.percentage}%)</b>'
        }
    });
    chart.appendTo('#container');
