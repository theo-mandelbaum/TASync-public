/**
 * Sample for RTL Range Navigator
 */
import * as React from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, RangeTooltip, Tooltip, AreaSeries, DateTime, Inject, RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, Legend } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { axesData } from './stock-data';
import { updateSampleSection } from '../common/sample-base';
import { loadRangeNavigatorTheme } from './theme-color';
import { borderColor, themes } from './theme-color';
let data = axesData;
export let zoomFactor;
export let zoomPosition;
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     #title{
         font-size: 15px;
         font-style: normal;
         font-family: "Segoe UI";
         font-weight: 500;
         text-anchor: middle;
         transform: none;
         opacity: 1;
     }
     #control-container {
         padding: 0px !important;
     }
 
     #container {
         transform: translate(0, 25%);
     }
 
     #material-gradient-chart stop {
         stop-color: #00bdae;
     }
 
     #fabric-gradient-chart stop {
         stop-color: #4472c4;
     }
 
     #bootstrap-gradient-chart stop {
         stop-color: #a16ee5;
     }
 
     #bootstrap4-gradient-chart stop {
         stop-color: #a16ee5;
     }
 
     #highcontrast-gradient-chart stop {
         stop-color: #79ECE4;
     }

   #tailwind-gradient-chart stop {
        stop-color: #5A61F6;
    }

	#tailwind3-gradient-chart stop {
        stop-color: #2F4074;
    }
 
     #bootstrap5-gradient-chart stop {
        stop-color: #FD7E14;
     }
 
     #material-dark-gradient-chart stop {
         stop-color: #9ECB08;
     }
 
     #fabric-dark-gradient-chart stop {
         stop-color: #4472c4;
     }
 
     #bootstrap-dark-gradient-chart stop {
         stop-color: #a16ee5;
     }
 
    #tailwinddark-gradient-chart stop {
        stop-color: #8B5CF6;
    }

    #tailwind3-dark-gradient-chart stop {
        stop-color: #8029F1;
    }
 
     #bootstrap5-dark-gradient-chart stop {
         stop-color: #8F80F4;
     }
 
     #fluent-gradient-chart stop {
         stop-color: #1AC9E6;
     }
 
     #fluent-dark-gradient-chart stop {
         stop-color: #1AC9E6;
     }

     #material3-gradient-chart stop {
         stop-color: #6355C7;
     }

     #material3-dark-gradient-chart stop {
         stop-color: #4EAAFF;
     }
 
     #fluent2-gradient-chart stop {
        stop-color: #6200EE;
    }

    #fluent2-highcontrast-gradient-chart stop {
        stop-color: #9BB449;
    }

    #fluent2-dark-gradient-chart stop {
        stop-color: #9BB449;
    }

     .chart-gradient stop[offset="0"] {
         stop-opacity: 0.9;
     }
 
     .chart-gradient stop[offset="1"] {
         stop-opacity: 0.3;
     }
     `;
function RTL() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let chart1;
    let rangenavigator1;
    let chartRendered;
    return (<div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className='control-section'>
                <div className="row" style={{ textAlign: "center" }}>
                    <div id="title">Inflation - Consumer Price</div>
                </div>
                <div className="row">
                    <RangeNavigatorComponent id='rangenavigator' ref={rangenavigator => rangenavigator1 = rangenavigator} style={{ textAlign: "center" }} height='120' labelPosition='Outside' tooltip={{ enable: true, displayMode: 'Always' }} valueType='DateTime' intervalType='Years' load={rangeLoad.bind(this)} changed={changed.bind(this)} width={Browser.isDevice ? '100%' : '80%'} enableRtl={true} value={[new Date('2014-01-01'), new Date('2015-12-31')]}>
                        <Inject services={[AreaSeries, DateTime, RangeTooltip]}/>
                        <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='xDate' yName='High' type='Area' width={2}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                </div>
                <div className="row">
                    <ChartComponent id='charts' enableRtl={true} ref={chart => chart1 = chart} style={{ textAlign: "center" }} primaryXAxis={{
            valueType: 'DateTime',
            crosshairTooltip: { enable: true },
            edgeLabelPlacement: 'Shift',
            majorGridLines: { width: 0 }
        }} primaryYAxis={{
            majorTickLines: { width: 0 },
            lineStyle: { width: 0 },
            labelFormat: '{value}%',
            minimum: 82, maximum: 87, interval: 1
        }} width={Browser.isDevice ? '100%' : '80%'} height='350' load={chartLoad.bind(this)} chartArea={{ border: { width: 0 } }} tooltip={{
            enable: true, shared: true,
            header: '<b>England<b>', format: '${point.x} : <b>${point.y}<b>'
        }} legendSettings={{ visible: false }}>
                        <Inject services={[AreaSeries, DateTime, Tooltip, Legend]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} name='England' xName='xDate' yName='High' type='Area' width={2}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <svg style={{ height: '0' }}>
                    <defs>
                        <linearGradient id="material-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fabric-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap4-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap5-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fabric-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="tailwind3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="bootstrap5-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material3-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="material3-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-highcontrast-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                        <linearGradient id="fluent2-dark-gradient-chart" style={{ opacity: 0.75 }} className="chart-gradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0"></stop>
                            <stop offset="1"></stop>
                        </linearGradient>
                    </defs>
                </svg>
                <div id="action-description">
                    <p>
                        This sample visualizes the consumer price with Range Navigator and Chart in RTL direction.
                    </p>
                </div>
                <div id="description">
                        <p><code>Right-to-left(RTL)</code> is used to render the component from right to left direction and it can be enabled by setting <code>enableRtl</code> property as <b>true</b>. In this demo, you can see <code>Axis</code> and <code>Data Points</code> are aligned from right to left direction.</p>
                        <p><code>Tooltip</code> is enabled in this example, to see the tooltip in action, while the selected range is changed.</p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        The range navigator component features are segregated into individual feature-wise modules. To use area series, inject the <code>AreaSeries</code> module using the <code>RangeNavigator.Inject(AreaSeries)</code> method.
                    </p>
                </div>
            </div>
        </div>);
    function changed(args) {
        if (chart1 && chartRendered) {
            chart1.primaryXAxis.zoomFactor = args.zoomFactor;
            chart1.primaryXAxis.zoomPosition = args.zoomPosition;
            chart1.dataBind();
        }
        else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    }
    ;
    function chartLoad(args) {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme = loadRangeNavigatorTheme(args, true);
        args.chart.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.chart.series[0].border.color = borderColor[themes.indexOf(args.chart.theme.toLowerCase())];
        args.chart.series[0].border.width = 2;
        chartRendered = true;
    }
    ;
    function rangeLoad(args) {
        let selectedTheme = loadRangeNavigatorTheme(args, true);
        args.rangeNavigator.series[0].type = "Area";
        args.rangeNavigator.series[0].fill = 'url(#' + selectedTheme.toLowerCase() + '-gradient-chart)';
        args.rangeNavigator.series[0].border.color = borderColor[themes.indexOf(args.rangeNavigator.theme.toLowerCase())];
        args.rangeNavigator.series[0].border.width = 2;
    }
    ;
}
export default RTL;
