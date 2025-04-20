define(["require", "exports", "../common/culture-loader", "@syncfusion/ej2-charts", "@syncfusion/ej2-base", "./theme-color"], function (require, exports, culture_loader_1, ej2_charts_1, ej2_base_1, theme_color_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    ej2_charts_1.Chart.Inject(ej2_charts_1.CandleSeries, ej2_charts_1.StripLine, ej2_charts_1.Category, ej2_charts_1.Tooltip, ej2_charts_1.DateTime, ej2_charts_1.Zoom, ej2_charts_1.ColumnSeries, ej2_charts_1.Logarithmic, ej2_charts_1.Crosshair);
    var pointColors = [];
    var getLabelText = function (value) {
        return (((value) / 1000000000)).toFixed(1) + 'bn';
    };
    window.default = function () {
        (0, culture_loader_1.loadCultureFiles)();
        var chartData;
        var fetchApi = new ej2_base_1.Fetch('./src/chart/data-source/financial-data.json', 'GET');
        fetchApi.send().then();
        fetchApi.onSuccess = function (data) {
            chartData = JSON.parse(data);
            chartData.map(function (data) {
                data['x'] = new Date(data['x']);
            });
            var chart = new ej2_charts_1.Chart({
                primaryXAxis: {
                    valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 },
                },
                primaryYAxis: {
                    title: 'Volume', valueType: 'Logarithmic', opposedPosition: true, majorGridLines: { width: 1 }, lineStyle: { width: 0 },
                    stripLines: [
                        {
                            end: 1300000000, startFromAxis: true, text: '', color: 'black', visible: true,
                            opacity: 0.03, zIndex: 'Behind'
                        }
                    ]
                },
                axes: [{
                        name: 'secondary', opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 },
                        labelFormat: 'n0', title: 'Price', plotOffset: 30, lineStyle: { width: 0 }, rangePadding: 'None'
                    }],
                rows: [{ height: '30%' }, { height: '70%' }],
                series: [
                    { type: 'Column', dataSource: chartData, animation: { enable: true }, xName: 'x', yName: 'volume', name: 'Volume' },
                    {
                        type: 'Candle', yAxisName: 'secondary', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d',
                        dataSource: chartData, animation: { enable: true }, volume: 'volume',
                        xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc',
                    }
                ], tooltip: { enable: true, shared: true },
                tooltipRender: function (args) {
                    if (!args.series.index) {
                        args.text = 'Volume : <b>' + getLabelText(args.text.split('<b>')[1].split('</b>')[0]) + '</b>';
                    }
                },
                pointRender: function (args) {
                    if (args.series.type === 'Candle') {
                        pointColors.push(args.fill);
                    }
                    else {
                        args.fill = pointColors[args.point.index];
                    }
                },
                axisLabelRender: function (args) {
                    if (args.axis.name === 'primaryYAxis') {
                        args.text = getLabelText(+args.text);
                    }
                    if (args.axis.name === 'secondary') {
                        args.text = '$' + args.text;
                    }
                },
                load: function (args) {
                    (0, theme_color_1.loadChartTheme)(args);
                },
                width: ej2_base_1.Browser.isDevice ? '100%' : '80%', chartArea: { border: { width: 0 } },
                crosshair: { enable: true, lineType: 'Vertical' }
            });
            chart.appendTo('#container');
        };
    };
});
