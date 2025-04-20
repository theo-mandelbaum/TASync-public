import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import { CircularChart3D, PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D, CircularChart3DLoadedEventArgs, CircularChart3DTheme } from '@syncfusion/ej2-charts';
import { Browser, EmitType } from '@syncfusion/ej2/base';
import { loadCircular3DChartTheme } from './theme-colors';
CircularChart3D.Inject( PieSeries3D, CircularChartDataLabel3D, CircularChartLegend3D, CircularChartTooltip3D );
/**
 * Sample for Doughnut chart
 */

    
    let pie: CircularChart3D = new CircularChart3D({
        // Initialize the chart series
        series: [
            {
                dataSource: [{ x: 'Tesla', y: 137429 }, { x: 'Aion', y: 80308 }, { x: 'Wuling', y: 76418 }, { x: 'Changan', y: 52849 }, { x: 'Geely', y: 47234 }, { x: 'Nio', y: 31041 }, { x: 'Neta', y: 22449 }, { x: 'BMW', y: 18733 }],
                dataLabel: {
                    visible: true,
                    name: 'x',
                    position: 'Outside',
                    font: {
                        fontWeight: '600',
                    },
                    connectorStyle: { length: Browser.isDevice ? '20px' : '40px' }
                },
                xName: 'x',
                yName: 'y',
                radius: Browser.isDevice ? '45%' : '75%',
                innerRadius: '65%',
            }
        ],
        title: 'Top Selling Electric Cars in China',
        legendSettings: {
            visible: false,
        },
        tooltip: { enable: true, header: "${point.x}", format: 'Sales Count : <b>${point.y}' },
        enableRotation: true,
        tilt: -30,
        load: (args: CircularChart3DLoadedEventArgs) => {
            loadCircular3DChartTheme(args);
        }
    });
    pie.appendTo('#container');

