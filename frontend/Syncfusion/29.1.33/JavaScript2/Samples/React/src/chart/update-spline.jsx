/**
 * Sample for Update DataSource.
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, SplineSeries, DateTime, DataLabel } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
let data = (function () {
    let data = [];
    let time = new Date().getTime();
    for (let i = -10; i <= 0; i += 1) {
        let cpuValue = Math.max(17, Math.random() * 100);
        data.push({
            x: time + i * 1000,
            y: cpuValue
        });
    }
    return data;
}());
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #container_Series_0_Point_10_Symbol {
        -webkit-animation: opac 1s ease-out infinite;
        animation: opac 1s ease-out infinite;
    }
    @keyframes opac {
        0% {
            stroke-opacity: 1;
            stroke-width: 10px;
        }
        100% {
            stroke-opacity: 0;
            stroke-width: 20px;
        }
    }`;
export class UpdateSpline extends SampleBase {
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='spline' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'DateTime', interval: 2, edgeLabelPlacement: Browser.isDevice ? 'None' : 'Shift', labelRotation: Browser.isDevice ? 45 : 0, majorGridLines: { width: 0 } }} primaryYAxis={{
                title: 'Value', interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
            }} axisRangeCalculated={this.axisRangeCalculated.bind(this)} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} loaded={this.onChartLoad.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title='Live data'>
                        <Inject services={[SplineSeries, DateTime, DataLabel]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} xName='x' yName='y' type='Spline' width={2} marker={{ visible: true, isFilled: true, width: 7, height: 7 }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This example demonstrates how to add and remove data points in a spline chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure a spline chart to display data that updates every second, with old data being removed. The X-axis represents the time at which the data is added, while the Y-axis displays the data values.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use the spline series, we need to inject the
                        <code>SplineSeries</code> module using the <code>Chart.Inject(SplineSeries)</code> method.
                    </p>
                    <p>
                        More information on the spline series can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline" aria-label="Navigate to the documentation for Spline Chart in React Chart control">documentation section</a>.
                    </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('spline');
        chart.setAttribute('title', '');
    }
    ;
    axisRangeCalculated(args) {
        if (args.axis.name === 'primaryXAxis') {
            let lastPoint = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 500;
        }
    }
    ;
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        setInterval(function () {
            let x = (new Date()).getTime();
            let y = Math.max(17, Math.random() * 100);
            if (args.chart.series.length > 0) {
                args.chart.series[0].addPoint({ x: x, y: y });
                args.chart.series[0].removePoint(0);
            }
        }, 1000);
    }
    ;
}
