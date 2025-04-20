import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);

import {
    Chart, HiloOpenCloseSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ChartTheme,
    Crosshair, IAxisLabelRenderEventArgs
} from '@syncfusion/ej2-charts';
import { chartValue } from './financial-data';
Chart.Inject(HiloOpenCloseSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, Crosshair);
import { Browser } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';

/**
 * Sample for Hilo Open Close series
 */

    

        let chart: Chart = new Chart({

            //Initializing Primary X Axis
            primaryXAxis: {
                valueType: 'DateTime',
                crosshairTooltip: { enable: true },
                majorGridLines: { width: 0 }

            },
            //Initializing Primary Y Axis
            primaryYAxis: {
                title: 'Price',
                labelFormat: 'n0',
                lineStyle: { width: 0 },
                minimum: 40,
                maximum: 140,
                interval: 20,
                majorTickLines: { width: 0 }
            },
            chartArea: { border: { width: 0 } },
            //Initializing Chart Series
            series: [
                {
                    type: 'HiloOpenClose',
                    dataSource: chartValue, animation: { enable: true },
                    bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                    xName: 'period', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc.(AAPL)'
                }
            ],
            //Initializing Chart title
            tooltip: { enable: true, shared: true, header: '', format:'<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b> '},
            crosshair: {
                enable: true, lineType: 'Vertical', 
            },
            title: 'AAPL Historical',
            legendSettings: { visible: false }, width: Browser.isDevice ? '100%' : '75%',
             // custom code start
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            }
             // custom code end
        });
        chart.appendTo('#container');
    

