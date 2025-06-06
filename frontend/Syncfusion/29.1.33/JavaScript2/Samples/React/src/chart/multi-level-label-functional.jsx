/**
 * Sample for smart axis labels
 */
import * as React from "react";
import { useEffect } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Tooltip, DataLabel, MultiLevelLabel, Category, ColumnSeries, Inject } from '@syncfusion/ej2-react-charts';
import { Browser } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme, pointRenderEvent } from './theme-color';
export let data1 = [{ x: 'Grapes', y: 28 }, { x: 'Apples', y: 87 },
    { x: 'Pears', y: 42 }, { x: 'Grapes', y: 13 },
    { x: 'Apples', y: 13 }, { x: 'Pears', y: 10 },
    { x: 'Tomato', y: 31 }, { x: 'Potato', y: 96 },
    { x: 'Cucumber', y: 41 }, { x: 'Onion', y: 59 }];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const Multilevellabels = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    const load = (args) => {
        loadChartTheme(args);
    };
    const pointRender = (args) => {
        pointRenderEvent(args);
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div>
                    <ChartComponent id='charts' style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', labelRotation: 90, border: { width: 1, type: 'Rectangle' }, isIndexed: true, interval: 1, majorGridLines: { width: 0 }, labelIntersectAction: Browser.isDevice ? 'Rotate90' : 'Trim', multiLevelLabels: (Browser.isDevice ? ([{ border: { type: 'Rectangle' }, categories: [{ start: -0.5, end: 2.5, text: 'In Season' }, { start: 2.5, end: 5.5, text: 'Out of Season' }, { start: 5.5, end: 7.5, text: 'In Season' }, { start: 7.5, end: 9.5, text: 'Out of Season' }] }, { border: { type: 'Rectangle' }, textStyle: { fontWeight: 'Bold' }, categories: [{ start: -0.5, end: 5.5, text: 'Fruits' }, { start: 5.5, end: 9.5, text: 'Vegetables' }] }]) : [{ border: { type: 'Rectangle' }, categories: [{ start: -0.5, end: 0.5, text: 'Seedless' }, { start: 0.5, end: 2.5, text: 'Seeded' }, { start: 2.5, end: 3.5, text: 'Seedless' }, { start: 3.5, end: 5.5, text: 'Seeded' }, { start: 5.5, end: 6.5, text: 'Seedless' }, { start: 6.5, end: 7.5, text: 'Seeded' }, { start: 7.5, end: 8.5, text: 'Seedless' }, { start: 8.5, end: 9.5, text: 'Seeded' }] }, { border: { type: 'Rectangle' }, categories: [{ start: -0.5, end: 2.5, text: 'In Season' }, { start: 2.5, end: 5.5, text: 'Out of Season' }, { start: 5.5, end: 7.5, text: 'In Season' }, { start: 7.5, end: 9.5, text: 'Out of Season' }] }, { border: { type: 'Rectangle' }, textStyle: { fontWeight: 'Bold' }, categories: [{ start: -0.5, end: 5.5, text: 'Fruits' }, { start: 5.5, end: 9.5, text: 'Vegetables' }] }]) }} width={Browser.isDevice ? '100%' : '75%'} chartArea={{ border: { width: 0 } }} primaryYAxis={{ minimum: 0, maximum: 120, interval: 30, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }} load={load.bind(this)} pointRender={pointRender} title="Fruits and Vegetables - Season" loaded={onChartLoad.bind(this)} legendSettings={{ visible: false }} tooltip={{ enable: false }}>
                        <Inject services={[Category, Category, ColumnSeries, Tooltip, DataLabel, MultiLevelLabel]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' yName='y' type='Column' marker={{ dataLabel: { visible: true, position: 'Outer' } }}/>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
            </div>
            <div id="action-description">
                <p>This example shows multilevel labels in the chart axis. We can add layers of labels to the axis using start and end range values.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to group axis labels.
                    You can customize text in each level by using <code>alignment</code>, <code>overflow</code>, <code>textSytle</code> and <code>border</code> properties.
                </p>
                <p>
                    Axis labels in each level can be arranged smartly using <code>overflow</code> property.
                </p>
                <ul>
                    <li><code>Trim</code> - Trim the label when it intersect.</li>
                    <li><code>Wrap</code> - Wrap the label when it intersect.</li>
                    <li><code>None</code> - Shows all the labels.</li>
                </ul>
                <p>
                    Border of the axis labels can be customized by using <code>type</code> property.
                </p>
                <ul>
                    <li><code>Rectangle</code></li>
                    <li><code>Brace</code></li>
                    <li><code>WithoutTopBorder</code></li>
                    <li><code>WithoutTopandBottomBorder</code></li>
                    <li><code>CurlyBrace</code></li>
                    <li><code>withoutBorder</code>.</li>
                </ul>
                <p>
                    More information on the multi level labels can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/axis-labels#multilevel-labels" aria-label="Navigate to the documentation for Multilevel Labels in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default Multilevellabels;
