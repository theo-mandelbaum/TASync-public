/**
 * Sample for Lazy Loading
 */
import * as React from "react";
import { useEffect, useRef } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, ScrollBar, Zoom, LineSeries, Tooltip, DateTime, Crosshair } from '@syncfusion/ej2-react-charts';
import { Internationalization } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { NumericTextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { loadChartTheme } from './theme-color';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
`;
const LazyLoading = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let chart = useRef(null);
    let lazymode = useRef(null);
    let intl = new Internationalization();
    let minDate;
    let maxDate;
    let pointslength;
    let droplist = [
        { value: 'Range' },
        { value: 'Points Length' }
    ];
    const scrollEnd = (args) => {
        if (lazymode.current.value === 'Range') {
            chart.current.series[0].dataSource = GetDateTimeData(args.currentRange.minimum, args.currentRange.maximum);
        }
        else {
            chart.current.series[0].dataSource = GetNumericData(args.currentRange.minimum, args.currentRange.maximum);
        }
        chart.current.dataBind();
    };
    const load = (args) => {
        loadChartTheme(args);
    };
    const minChange = (args) => {
        chart.current.primaryXAxis.scrollbarSettings.range.minimum = args.value;
        chart.current.refresh();
    };
    const maxChange = (args) => {
        chart.current.primaryXAxis.scrollbarSettings.range.maximum = args.value;
        chart.current.refresh();
    };
    const pointChange = (args) => {
        chart.current.primaryXAxis.scrollbarSettings.pointsLength = args.value;
        chart.current.refresh();
    };
    const modeChange = (arg) => {
        let min;
        let max;
        if (arg.value === 'Range') {
            chart.current.primaryXAxis.valueType = 'DateTime';
            min = chart.current.primaryXAxis.scrollbarSettings.range.minimum = new Date(2009, 0, 1);
            max = chart.current.primaryXAxis.scrollbarSettings.range.maximum = new Date(2014, 0, 1);
            chart.current.series[0].dataSource = GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1));
            chart.current.refresh();
            minDate.enabled = true;
            maxDate.enabled = true;
            pointslength.enabled = false;
        }
        else {
            chart.current.primaryXAxis.valueType = 'Double';
            chart.current.primaryXAxis.scrollbarSettings.range.minimum = null;
            chart.current.primaryXAxis.scrollbarSettings.range.maximum = null;
            chart.current.primaryXAxis.scrollbarSettings.pointsLength = 1000;
            chart.current.series[0].dataSource = GetNumericData(1, 200);
            chart.current.refresh();
            minDate.enabled = false;
            maxDate.enabled = false;
            pointslength.enabled = true;
        }
    };
    const GetDateTimeData = (start, end) => {
        let series1 = [];
        let date;
        let value = 30;
        let option = {
            skeleton: 'full',
            type: 'dateTime'
        };
        let dateParser = intl.getDateParser(option);
        let dateFormatter = intl.getDateFormat(option);
        for (let i = 0; start <= end; i++) {
            date = Date.parse(dateParser(dateFormatter(start)));
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            let point1 = { x: new Date(date), y: Math.round(value) };
            new Date(start.setDate(start.getDate() + 1));
            series1.push(point1);
        }
        return series1;
    };
    const GetNumericData = (start, end) => {
        let series1 = [];
        let value = 30;
        for (let i = start; i <= end; i++) {
            if (Math.random() > .5) {
                value += (Math.random() * 10 - 5);
            }
            else {
                value -= (Math.random() * 10 - 5);
            }
            if (value < 0) {
                value = getRandomInt(20, 40);
            }
            let point = { x: i, y: Math.round(value) };
            series1.push(point);
        }
        return series1;
    };
    const getRandomInt = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chart} primaryXAxis={{ valueType: 'DateTime', edgeLabelPlacement: 'Shift', skeleton: 'yMMM', skeletonType: 'Date', majorGridLines: { width: 0 }, scrollbarSettings: { range: { minimum: new Date(2009, 0, 1), maximum: new Date(2014, 0, 1) }, enable: true, pointsLength: 1000, enableZoom: false, height: 14 } }} primaryYAxis={{ title: 'Server Load', labelFormat: '{value}MB', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }} tooltip={{ enable: true, showNearestTooltip: true, header: '<b>${point.x}</b>', format: 'Server load : <b>${point.y}</b>', enableHighlight: true }} legendSettings={{ visible: true }} scrollEnd={scrollEnd.bind(this)} load={load.bind(this)} title='Network Load' height='450' width='100%' chartArea={{ border: { width: 0 } }}>
                        <Inject services={[LineSeries, DateTime, Tooltip, ScrollBar, Zoom, Crosshair]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={GetDateTimeData(new Date(2009, 0, 1), new Date(2009, 8, 1))} xName='x' yName='y' type='Line' animation={{ enable: false }}>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '40%' }}>
                                    <div>Lazy Load </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent index={0} width={120} id="lazymode" ref={lazymode} style={{ "width": "auto" }} change={modeChange.bind(this)} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="Range"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Min </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DatePickerComponent width={120} ref={min => minDate = min} id="datepickermin" style={{ "width": "auto" }} change={minChange.bind(this)} value={new Date(2009, 0, 1)}/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td>
                                    <div>Max </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DatePickerComponent width={120} ref={max => maxDate = max} id="datepickermax" style={{ "width": "auto" }} change={maxChange.bind(this)} value={new Date(2014, 0, 1)}/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ width: '40%' }}>
                                <td>
                                    <div id="pointLength">Point Length </div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <NumericTextBoxComponent min={1000} max={10000} value={1000} step={100} enabled={false} format={'n'} width={120} ref={point => pointslength = point} id="pointslength" style={{ "width": "auto" }} change={pointChange.bind(this)} aria-labelledby="Text"/>
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample illustrates lazy loading feature in chart which loads data on demand.</p>
            </div>
            <div id="description">
                <p>
                    In this example, you can see how to load data for the chart on demand. The chart will fire the <code>scrollEnd</code> event, and in that event, we can update the chart with the required data based on the point length and axis range. The scrollbar in the chart can be customized using the <code>height</code>, <code>trackColor</code>, <code>trackRadius</code>, <code>scrollbarRadius</code>, <code>scrollbarColor</code>, <code>enableZoom</code>, and <code>gripColor</code> properties in <code>scrollbarSettings</code>.
                </p>
                <p>
                    <code>Tooltips</code> are enabled in this example. To see a tooltip in action, hover over or tap on the chart.
                </p>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use lazy loading need to
                    inject <code>ScrollBar</code> and <code>Zoom</code> modules into <code>services</code>.
                </p>
                <p>
                    More information about the lazy loading can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#lazy-loading" aria-label="Navigate to the documentation for Lazy loading in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default LazyLoading;
