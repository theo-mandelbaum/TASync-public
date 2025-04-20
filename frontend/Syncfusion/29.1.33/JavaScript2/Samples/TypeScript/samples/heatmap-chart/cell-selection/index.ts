import { enableRipple } from '@syncfusion/ej2-base';
enableRipple((window as any).ripple);
import { HeatMap, Tooltip, ILoadedEventArgs, HeatMapTheme, ISelectedEventArgs, SelectedCellDetails, Legend as HeatMapLegend } from '@syncfusion/ej2-heatmap';
import { ChartTheme, Chart, ColumnSeries, Category, Legend, DataLabel, Tooltip as chartTooltip, ILoadedEventArgs as IChartLoadedEventsArgs } from '@syncfusion/ej2-charts';
import { Button } from '@syncfusion/ej2-buttons';
import * as data from './cell-seletion-data.json';
HeatMap.Inject(Tooltip, HeatMapLegend);
Chart.Inject(ColumnSeries, DataLabel, Category, Legend, chartTooltip);
// custom code start


// custom code end

    let heatmap: HeatMap = new HeatMap({
        titleSettings: {
            text: 'Top export products 2014-2018, Value in USD million',
            textStyle: {
                size: '15px',
                fontWeight: '500',
                fontStyle: 'Normal',
                fontFamily: 'inherit'
            }
        },
        xAxis: {
            labels: ['Cereals', 'Meat', 'Spices', 'Tea', 'Edible Oil', 'Dairy Products', 'Wheat'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        yAxis: {
            labels: ['2014', '2015', '2016', '2017', '2018'],
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        legendSettings: {
            visible: false
        },
        allowSelection: true,
        dataSource: (data as any).cellSeletionData,
        paletteSettings: {
            palette: [
                { color: '#3C5E62 ' },
                { color: '#86C843 ' }
            ],
        },
        showTooltip: true,
        load: (args: ILoadedEventArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        },
        cellSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        tooltipSettings:{
            textStyle: {
                fontFamily: 'inherit'
            }
        },
        cellSelected: (args: ISelectedEventArgs) => {
            let data: SelectedCellDetails[] = args.data;
            let length: number = data.length;
            let xAxis: string[] = [];
            let flag: boolean[] = [];
            let series: any = [];
            for (let i: number = 0; i < length; i++) {
                if (xAxis.indexOf(data[i].xLabel) === -1) {
                    xAxis.push(data[i].xLabel);
                    flag.push(false);
                }
            }
            for (let i: number = 0; i < length; i++) {
                let index: number = xAxis.indexOf(data[i].xLabel);
                if (!flag[index]) {
                    flag[index] = true;
                    let column: any = {};
                    column.type = 'Column';
                    column.xName = 'x';
                    column.yName = 'y';
                    column.width = 2;
                    column.name = data[i].xLabel;
                    column.marker = { dataLabel: { visible: false } };
                    column.dataSource = [];
                    let columnData: any = {};
                    columnData.x = data[i].yLabel;
                    columnData.y = data[i].value;
                    column.dataSource.push(columnData);
                    series.push(column);
                } else {
                    let columnData: any = {};
                    columnData.x = data[i].yLabel;
                    columnData.y = data[i].value;
                    series[index].dataSource.push(columnData);
                }
            }
            chart.series = series;
            chart.refresh();
        },
    });
    heatmap.appendTo('#container');
    let chart: Chart = new Chart({
        primaryXAxis: {
            valueType: 'Category', interval: 1, majorGridLines: { width: 0 }
        },
        chartArea: { border: { width: 0 } },
        primaryYAxis:
            {
                majorGridLines: { width: 0 },
                majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }
            },
        series: (data as any).chartData,
        tooltip: {
            enable: true
        },
        load: (args: IChartLoadedEventsArgs) => {
            // custom code start
            let selectedTheme: string = location.hash.split('/')[1];
            selectedTheme = selectedTheme ? selectedTheme : 'Material';
            args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() +
                selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5');
            // custom code end
        }
    });
    chart.appendTo('#container1');
    let button: Button = new Button();
    button.appendTo('#clearSelection');
    document.getElementById('clearSelection').onclick = () => {
        heatmap.clearSelection();
        chart.series = (data as any).chartData;
        chart.refresh();
    };
