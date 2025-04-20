/**
 * Sample for Column series
 */
import * as React from "react";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ChartTheme, ILoadedEventArgs, LineSeries, DataLabel, IMouseEventArgs, Series, IAxisRangeCalculatedEventArgs, Tooltip
} from '@syncfusion/ej2-react-charts';

import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

let chartData: Object[] = [
    { x: 20, y: 20 }, { x: 80, y: 80 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class ClickAddPoint extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='AddPoint' ref={chart=>this.chartInstance=chart} style={{ textAlign: "center" }}
                        primaryXAxis={{
                            edgeLabelPlacement: 'Shift',
                            rangePadding: 'Additional',
                            majorGridLines: { width: 0 }
                        }} primaryYAxis={{
                            title: 'Value', interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                        }} chartMouseClick={this.chartMouseClick.bind(this)}  axisRangeCalculated={this.axisRangeCalculated.bind(this)}
                        tooltip={{ enable: true, enableHighlight: true }}
                        chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} loaded={this.loaded.bind(this)} width={Browser.isDevice ? '100%' : '70%'} title='User supplied data' >
                        <Inject services={[LineSeries, DataLabel, Tooltip]} />
                        <SeriesCollectionDirective >
                            <SeriesDirective dataSource={chartData} xName='x' yName='y' type='Line' width={3} marker={{ visible: true, isFilled: true, border: { width: 2, color: 'White' }, width: 13, height: 13 }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a chart that allows users to add new data and update existing data source by clicking in the chart area. Additionally, clicking on an existing point will remove that data from the existing data source.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, the X-Axis and Y-Axis data of the currently clicked location are retrieved from the <code>chartMouseClick</code> event arguments and converted into a new point. This point is then added to the existing datasource. If there is already a point with the same coordinates present, it will be removed from the existing datasource.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use the line series, we need to inject the
                        <code>LineSeries</code> module using <code>Chart.Inject(LineSeries)</code> method.
                    </p>
                    <p>
                        More information on the line series can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-types/line" aria-label="Navigate to the documentation for Line Chart in React Chart control">documentation section</a>.
                    </p>
                </div>
            </div>
        )
    }

    public chartMouseClick(args: IMouseEventArgs): void {
        let isRemoved: boolean = false;
        if (args.axisData) {
            for (let i: number = 0; i < (this.chartInstance.series[0] as Series).points.length; i++) {
                const markerWidth: number = (this.chartInstance.series[0] as Series).marker.width / 2;
                if (Math.round(args.axisData['primaryXAxis']) + markerWidth === Math.round((this.chartInstance.series[0] as Series).points[i].x as number) + markerWidth &&
                    Math.round(args.axisData['primaryYAxis']) + markerWidth === Math.round((this.chartInstance.series[0] as Series).points[i].y as number) + markerWidth) {
                    if ((this.chartInstance.series[0] as Series).points.length > 1) {
                        this.chartInstance.series[0].removePoint(i);
                    }
                    isRemoved = true;
                }
            }
            if (!isRemoved) {
                this.chartInstance.series[0].addPoint({ x: Math.round(args.axisData['primaryXAxis']), y: Math.round(args.axisData['primaryYAxis']) });
            }
        }
    };
    public axisRangeCalculated(args: IAxisRangeCalculatedEventArgs): void {
        if (args.axis.name === 'primaryXAxis') {
            if (args.interval < 10) {
                args.maximum = args.maximum + 10;
                args.minimum = args.minimum - 10;
                args.interval = 10;
            }
        }
    };
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };

    public loaded (args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('AddPoint');
        chart.setAttribute('title', '');
    };

}
