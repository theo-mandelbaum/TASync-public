import { loadCultureFiles } from '../common/culture-loader';
import {
    ChartTheme, Chart, CandleSeries, Category, Tooltip, ILoadedEventArgs, DateTime, Zoom, Logarithmic, ColumnSeries,
    Crosshair, StripLine, IAxisLabelRenderEventArgs, ITooltipRenderEventArgs
} from '@syncfusion/ej2-charts';
import { IPointRenderEventArgs } from '@syncfusion/ej2-charts';
import { Browser, Fetch } from '@syncfusion/ej2-base';
import { loadChartTheme } from './theme-color';
Chart.Inject(CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair);
let pointColors: string[] = [];

let getLabelText: Function = (value: number): string => {
    return (((value) / 1000000000)).toFixed(1) + 'bn';
};

/**
 * Sample for Candle series
 */
(window as any).default = (): void => {
    loadCultureFiles();
    let chartData: Object[];
    let fetchApi: Fetch = new Fetch('./src/chart/data-source/financial-data.json', 'GET');
    fetchApi.send().then();
    // Rendering Dialog on Fetch success
    fetchApi.onSuccess = (data: string): void => {
        chartData = JSON.parse(data);
        chartData.map((data: Object) => {
            // tslint:disable-next-line:no-string-literal
            data['x'] = new Date(data['x']);
        });
        let chart: Chart = new Chart({
            // Initialize the axes
            primaryXAxis: {
                valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 },
            },
            primaryYAxis: {
                title: 'Volume', valueType: 'Logarithmic', opposedPosition: true, majorGridLines: { width: 1 }, lineStyle: { width: 0 },
                stripLines: [
                    {
                        end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                        opacity: 0.03, zIndex: 'Behind'
                    }]
            },
            axes: [{
                name: 'secondary', opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
                labelFormat: 'n0', title: 'Price', plotOffset: 30, lineStyle: { width: 0 }, rangePadding: 'None'
            }],
            // Initialize the chart rows
            rows: [{ height: '30%' }, { height: '70%' }],
            // Initialize the chart series
            series: [
                { type: 'Column', dataSource: chartData, animation: { enable: true }, xName: 'x', yName: 'volume', name: 'Volume' },
                {
                    type: 'Candle', yAxisName: 'secondary', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                    dataSource: chartData, animation: { enable: true }, volume: 'volume',
                    xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc',
                }
            ], tooltip: { enable: true, shared: true },
            tooltipRender: (args: ITooltipRenderEventArgs) => {
                if (!args.series.index) {
                    args.text = 'Volume : <b>' + getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
                }
            },
            pointRender: (args: IPointRenderEventArgs) => {
                if (args.series.type === 'Candle') { pointColors.push(args.fill); } else {
                    args.fill = pointColors[args.point.index];
                }
            },
            axisLabelRender: (args: IAxisLabelRenderEventArgs) => {
                if (args.axis.name === 'primaryYAxis') { args.text = getLabelText(+args.text); }
                if (args.axis.name === 'secondary') { args.text = '$' + args.text; }
            },
            load: (args: ILoadedEventArgs) => {
                loadChartTheme(args);
            },
            width: Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } },
            crosshair: { enable: true, lineType: 'Vertical' }
        });
        chart.appendTo('#container');
    };
};
