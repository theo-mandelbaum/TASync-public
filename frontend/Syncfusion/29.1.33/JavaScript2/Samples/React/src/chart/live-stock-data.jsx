/**
 * Sample for Candle Series
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, AnnotationsDirective, AnnotationDirective, CandleSeries, Category, Tooltip, DateTime, Zoom, Logarithmic, ColumnSeries, Crosshair, StripLine, SeriesDirective, Inject, ChartAnnotation } from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
let value = 180;
let getData = () => {
    let series = [];
    let point;
    for (let i = 0; i < 30; i++) {
        let change;
        if (i < 10 && !(i === 3 || i === 4 || i === 7)) {
            change = -Math.round(Math.random() * 10);
        }
        else if ((i >= 10 || i === 3 || i === 4 || i === 7 || i === 23 || i === 24 || i === 27) && i < 20 && !(i === 13 || i === 14 || i === 17)) {
            change = Math.round(Math.random() * 10);
        }
        else if ((i >= 20 || i === 13 || i === 14 || i === 17) && !(i === 23 || i === 24 || i === 27)) {
            change = -Math.round(Math.random() * 10);
        }
        else {
            change = 0;
        }
        value = value + change;
        if (value > 240) {
            value = 240;
        }
        if (value < 140) {
            value = 140;
        }
        let open = value + Math.round(Math.random() * 12);
        let low = Math.min(value, open) - Math.round(Math.random() * 8);
        let high = Math.max(value, open) + Math.round(Math.random() * 14);
        point = {
            x: new Date(2000, 5, 2, 2, 0, i),
            close: value,
            open: open,
            low: low,
            high: high
        };
        series.push(point);
    }
    return { series: series };
};
let data = getData().series;
let incVal = 0;
let updateVal = data.length;
let pointAdded = false;
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
/**
 * Candle sample
 */
export class Candle extends SampleBase {
    chartInstance;
    render() {
        return (<div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section'>
                    <div className="row">
                        <ChartComponent id='stock' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }} load={this.load.bind(this)} primaryXAxis={{ valueType: 'DateTime', interval: 4, crosshairTooltip: { enable: true }, edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift', majorGridLines: { width: 0 } }} primaryYAxis={{ interval: 20, minimum: 120, opposedPosition: true, lineStyle: { width: 0 }, crosshairTooltip: { enable: true }, majorGridLines: { width: 1 }, majorTickLines: { width: 0 } }} width={Browser.isDevice ? '100%' : '90%'} chartArea={{ border: { width: 0 } }} title="AAPL Historical" crosshair={{ enable: true, dashArray: '5,5' }} pointRender={this.pointRender.bind(this)} axisRangeCalculated={this.axisRangeCalculated.bind(this)}>
                            <Inject services={[CandleSeries, StripLine, Category, Tooltip, DateTime, Zoom, ColumnSeries, Logarithmic, Crosshair, ChartAnnotation]}/>
                            <SeriesCollectionDirective>
                                <SeriesDirective type='Candle' bearFillColor='#2ecd71' bullFillColor='#e74c3d' dataSource={data} columnWidth={0.4} xName='x' low='low' high='high' open='open' close='close'/>
                            </SeriesCollectionDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div></div>' x={new Date(2000, 5, 2, 2, 0, 1)} y={140} region="Series" coordinateUnits='Point'>
                                </AnnotationDirective>
                            </AnnotationsDirective>
                        </ChartComponent>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample visualizes the animation in the candle chart when existing data is updated or new data is added.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the candlestick series to display data that updates every second and adds new data every five seconds. The chart demonstrates setting up a crosshair to follow the latest data and adjusting the point color based on the value.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use the candle series, we need to inject
                        <code>CandleSeries</code> module using <code>Chart.Inject(CandleSeries)</code> method.
                    </p>
                    <p>
                        More information on the candle series can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/financial-types/#candle" aria-label="Navigate to the documentation for Candle Chart in React Chart control">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    axisRangeCalculated(args) {
        if (args.axis.name === 'primaryXAxis') {
            let lastPoint = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 2500;
            let firstPoint = args.axis.series[0].points[0].x;
            args.minimum = new Date(Number(firstPoint)).getTime() + 500;
        }
    }
    ;
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        setInterval(function () {
            let newData1 = [];
            pointAdded = true;
            for (let i = 0; i < args.chart.series[0].dataSource.length; i++) {
                newData1.push(Object.assign({}, args.chart.series[0].dataSource[i]));
            }
            if (newData1.length > 0) {
                const lastIndex = newData1.length - 1;
                const previousClose = newData1[lastIndex].close;
                newData1[lastIndex].close += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 5;
                newData1[lastIndex].close = Math.min(Math.min(Math.max(newData1[lastIndex].close, newData1[lastIndex].low + 5), newData1[lastIndex].high - 5), newData1[lastIndex].open - 2);
                if (previousClose === newData1[lastIndex].close) {
                    newData1[lastIndex].close -= 1;
                }
            }
            if (incVal < 10) {
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData1);
                    incVal++;
                }
            }
            else {
                let change = Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10);
                value += change;
                if (value > 200) {
                    value = 200;
                }
                else if (value < 160) {
                    value = 160;
                }
                let open = value + Math.round(Math.random() * 12);
                let low = Math.min(value, open) - Math.round(Math.random() * 8);
                let high = Math.max(value, open) + Math.round(Math.random() * 15);
                if (args.chart.series.length > 0) {
                    args.chart.series[0].addPoint({ x: new Date(2000, 5, 2, 2, 0, updateVal), high: high, low: low, open: open, close: value });
                }
                incVal = 0;
                updateVal++;
            }
        }, 1000);
    }
    ;
    pointRender(args) {
        if (args.series.chart.enableRtl) {
            args.series.chart.annotations[0].x = 0;
        }
        if (pointAdded && args.series.points[args.series.points.length - 1] === args.point) {
            const firstPoint = args.series.chart.enableRtl ? args.series.points[args.series.points.length - 1].x : args.series.points[0].x;
            args.series.chart.annotations[0].x = new Date(Number(firstPoint)).getTime() + (args.series.chart.enableRtl ? 2000 : 1000);
            args.series.chart.annotations[0].y = args.point.close;
            args.series.chart.annotations[0].content = `<div style="width: ${args.series.chart.initialClipRect.width}px; height: 0; left: ${Browser.isDevice ? -10 : -16}px; position: absolute;">
            <svg width="100%" height="2" style="display: block;">
              <line x1="0" y1="1" x2="${args.series.chart.initialClipRect.width}" y2="1" 
                style="stroke:#868180; stroke-width:0.75; stroke-dasharray:5,5;" />
            </svg>
          </div>
          <div style="width: 40px; height: 18px; background-color: ${args.fill}; border: 1px solid rgba(48, 153, 245, 0.4); color: white; font-size: 11px; text-align: center; line-height: 18px; position: absolute; left: ${(args.series.chart.enableRtl ? -args.series.chart.initialClipRect : args.series.chart.initialClipRect.width - 20)}px; top: -9px;">
            ${args.point.close.toFixed(2)}
          </div> `;
        }
    }
}
