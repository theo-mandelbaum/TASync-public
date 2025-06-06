/**
 * Sample for Area series with empty points
 */
import * as React from 'react';
import { ChartComponent, SeriesCollectionDirective, Highlight, SeriesDirective, Inject, Tooltip, Category, AreaSeries, Legend, } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';
export let data1 = [
    { Period: 'Nov 14', US_InflationRate: 2.2, IN_InflationRate: 0.8 }, { Period: 'Nov 15', US_InflationRate: 2.0, IN_InflationRate: 1.7 }, { Period: 'Nov 16', US_InflationRate: 2.8, IN_InflationRate: 1.8 },
    { Period: 'Nov 17', US_InflationRate: 1.6, IN_InflationRate: 2.1 }, { Period: 'Nov 18', US_InflationRate: 2.3, IN_InflationRate: null }, { Period: 'Nov 19', US_InflationRate: 2.5, IN_InflationRate: 2.3 },
    { Period: 'Nov 20', US_InflationRate: 2.9, IN_InflationRate: 1.7 }, { Period: 'Nov 21', US_InflationRate: 1.1, IN_InflationRate: 1.5 }, { Period: 'Nov 22', US_InflationRate: 1.4, IN_InflationRate: 0.5 },
    { Period: 'Nov 23', US_InflationRate: 1.1, IN_InflationRate: 1.3 }
];
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
/**
 * Area empty sample
 */
export class AreaEmpty extends SampleBase {
    render() {
        return (<div className="control-pane">
        <style>{SAMPLE_CSS}</style>
        <div className="control-section">
          <ChartComponent id="charts" style={{ textAlign: 'center' }} primaryXAxis={{ valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }} primaryYAxis={{ labelFormat: '{value}MB', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, minimum: 0, maximum: 5, interval: 1 }} tooltip={{ enable: true, format: '${point.x} : <b>${point.y}</b>', enableHighlight: true, showNearestTooltip: true }} legendSettings={{ enableHighlight: true }} chartArea={{ border: { width: 0 } }} load={this.load.bind(this)} width={Browser.isDevice ? '100%' : '75%'} title="Data Consumption" loaded={this.onChartLoad.bind(this)}>
            <Inject services={[AreaSeries, Category, Legend, Tooltip, Highlight]}/>
            <SeriesCollectionDirective>
              <SeriesDirective dataSource={data1} xName="Period" yName="US_InflationRate" name="Andrew" opacity={0.5} marker={{ visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
              <SeriesDirective dataSource={data1} xName="Period" yName="IN_InflationRate" name="Thomas" marker={{ visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }} opacity={0.5} type="Area" width={2} border={{ width: 2 }}></SeriesDirective>
            </SeriesCollectionDirective>
          </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample illustrates an area series with empty points. Data points with null points are shown here.
            </p>
                </div>
                <div id="description">
                    <p>
                    In this example, you can see how to render an area series with empty points. Also, a legend is enabled in the shape of the series.  
                   </p>
                    <p>
                        <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                    </p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject
                       <code>AreaSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the area empty points can be found in this &nbsp;
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data#empty-points" aria-label="Navigate to the documentation for Empty points in React Chart component">documentation section</a>.
                  </p>
                </div>
            </div>);
    }
    onChartLoad(args) {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    }
    ;
    load(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    }
    ;
}
