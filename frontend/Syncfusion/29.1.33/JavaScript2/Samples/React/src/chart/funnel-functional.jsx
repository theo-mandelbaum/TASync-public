import * as React from 'react';
import { useEffect, useRef } from 'react';
import { updateSampleSection } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';
import { AccumulationChartComponent, AccumulationSeriesCollectionDirective, AccumulationSeriesDirective, Inject, AccumulationLegend, FunnelSeries, AccumulationTooltip, AccumulationDataLabel } from '@syncfusion/ej2-react-charts';
import { loadAccumulationChartTheme, funnelPointRender } from './theme-color';
export let funnelData = [
    { x: "Candidates Applied", y: 170, text: "Applications Received: 170" },
    { x: "Initial Validation", y: 145, text: "Initial Validation: 145" },
    { x: "Screening", y: 105, text: Browser.isDevice ? "Screening <br> Completed: 105" : "Screening Completed: 105" },
    { x: "Telephonic Interview", y: 85, text: Browser.isDevice ? "Phone <br> Interview: 85" : "Phone Interview: 85" },
    { x: "Personal Interview", y: 58, text: Browser.isDevice ? "Final <br> Interview: 58" : "Final Interview: 58" },
    { x: "Hired", y: 30, text: "Final <br> Selections: 30" }
];
const onPointRender = (args) => {
    funnelPointRender(args);
};
const Funnel = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let funnelObj = useRef(null);
    const onChartLoad = (args) => {
        document.getElementById('funnel-chart').setAttribute('title', '');
    };
    const load = (args) => {
        loadAccumulationChartTheme(args);
    };
    return (<div className='control-pane'>
            <div className='control-section row' style={{ textAlign: "center" }}>
                <AccumulationChartComponent ref={funnelObj} legendSettings={{ visible: false }} id='funnel-chart' title='Recruitment Funnel: From Application to Hiring' load={load.bind(this)} tooltip={{ enable: false, format: '${point.x} : <b>${point.y}</b>' }} loaded={onChartLoad.bind(this)} pointRender={onPointRender.bind(this)} width={Browser.isDevice ? '100%' : '75%'}>
                    <Inject services={[FunnelSeries, AccumulationTooltip, AccumulationDataLabel, AccumulationLegend]}/>
                    <AccumulationSeriesCollectionDirective>
                        <AccumulationSeriesDirective dataSource={funnelData} xName='x' yName='y' type='Funnel' explode={false} dataLabel={{ connectorStyle: { length: '20px' }, name: 'text', visible: true, position: 'Inside', font: { fontWeight: '600', size: Browser.isDevice ? '11px' : '13px' } }} funnelMode='Trapezoidal'/>
                    </AccumulationSeriesCollectionDirective>
                </AccumulationChartComponent>
            </div>
            <div id="action-description">
                <p>This React Funnel Chart example shows a funnel chart for recruitment process. Datalabels show information about the points.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to render and configure a funnel chart to visualize the recruitment process. The <code>trapezoidal</code> funnelMode is set to display the stages of the employment cycle, from the number of candidates who applied to the number of hires. The labels are smartly arranged to avoid overlapping.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use Funnel series, we need to inject <code>FunnelSeries</code> module into <code>services</code>.
                </p>
                <p>
                    More information about the funnel series can be found in this <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/accumulation-chart/funnel/" aria-label="Navigate to the documentation for Funnel in React Accumulation Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Funnel;
