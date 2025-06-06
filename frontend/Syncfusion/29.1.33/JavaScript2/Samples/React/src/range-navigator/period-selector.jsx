/**
 * Sample for Range Navigator Period Selector with Candle Series
 */
import * as React from "react";
import { Inject, ChartComponent, StripLine, PeriodSelector, ChartAnnotation, CandleSeries, MomentumIndicator, SeriesDirective, Crosshair, DateTime, LineSeries, SeriesCollectionDirective, Tooltip, RangeNavigatorComponent, RangenavigatorSeriesCollectionDirective, RangenavigatorSeriesDirective, AnnotationDirective, AnnotationsDirective, withInBounds } from '@syncfusion/ej2-react-charts';
import { Browser, remove } from '@syncfusion/ej2-base';
import { SwitchComponent } from '@syncfusion/ej2-react-buttons';
import { SampleBase } from '../common/sample-base';
import { periodData } from './period-data';
import { getElement } from "@syncfusion/ej2-svg-base/src/tooltip/helper";
export let zoomFactor;
export let zoomPosition;
export let data = [];
for (let i = 2110; i < periodData.length; i++) {
    data.push({
        High: periodData[i].High,
        Low: periodData[i].Low,
        Close: periodData[i].Close,
        Open: periodData[i].Open,
        date: new Date(2010, 6, i)
    });
}
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px;
    }
    #rowStyle{
        width:80%; transform: translateX(13%)
    }
    #text{ 
        transform:translateX(15%);       
        display: flex; font-size: 36px; font-weight: 500;
        align-items: center;
        justify-content: space-between;
        align:left;
    }
    .col-sm-4{
        align : right;
        margin-top: 1%
    }
    #chart_tooltip {
        opacity: 0;
    }
    #switchname{
        font-size: 16px; margin-right: 2%
    }
    #switchname-0{
        font-size: 16px; margin-right: 2%
    }
    .e-switch-wrapper {
        margin-top: 5%;
        width: 15%
    }
    #chart_HorizontalLine, #chart_VerticalLine {
            stroke-dasharray: 2
    }
    @media only screen and (max-width: 300px) {
    #text {
        font-size: 10px
    }
    }
    `;
export function annotationTemplate(props) {
    return (<div id="annotation"></div>);
}
export class PeriodSelectorCandle extends SampleBase {
    chart1;
    rangenavigator1;
    rangenavigator2;
    chartRendered;
    range1Rendered;
    range2Rendered;
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                <div className="row" id="rowStyles">
                    <div className="col-sm-8">
                        <div id="text">
                            Bitcoin (USD) Price
                        </div>
                    </div>
                    <div className="col-sm-4">
                                <label id="switchname-0" htmlFor="checked-0"> Closing Price </label>
                                        <SwitchComponent id="checked" checked={true} name="Closing Value" value="Closing Value" cssClass="custom-iOS" change={this.switchChanged.bind(this)}>
                                        </SwitchComponent>
                                <label id="switchname" htmlFor="checked-1"> OHLC </label>
                    </div>
                </div>
                 <div className="row">
                 <RangeNavigatorComponent id='rangenavigator' ref={rangenavigator => this.rangenavigator1 = rangenavigator} style={{ textAlign: "center" }} valueType='DateTime' labelPosition='Outside' width={Browser.isDevice ? '100%' : '80%'} xName='date' yName='Close' disableRangeSelector={true} dataSource={data} periodSelectorSettings={{
                position: 'Top',
                periods: [
                    { text: '1M', interval: 1, intervalType: 'Months' }, { text: '3M', interval: 3, intervalType: 'Months' },
                    { text: '6M', interval: 6, intervalType: 'Months' }, { text: '1Y', interval: 1, intervalType: 'Years' },
                    { text: '2Y', interval: 2, intervalType: 'Years', selected: true }, { text: 'ALL' }
                ]
            }} load={this.rangeLoad.bind(this)} loaded={this.rangeLoaded.bind(this)} changed={this.changed.bind(this)}>
                    <Inject services={[DateTime, PeriodSelector]}/>
                    </RangeNavigatorComponent>
                    </div>
                     <div className="row">
                    <ChartComponent id='chart' ref={chart => this.chart1 = chart} style={{ textAlign: "center" }} primaryXAxis={{
                valueType: 'DateTime',
                majorGridLines: { width: 0 },
                edgeLabelPlacement: 'Shift'
            }} primaryYAxis={{
                title: 'Price',
                labelFormat: 'n0',
                opposedPosition: true, lineStyle: { width: 0 }
            }} height='250' width={Browser.isDevice ? '100%' : '80%'} margin={{ top: 0 }} load={this.chartLoad.bind(this)} axisLabelRender={this.labelRender.bind(this)} tooltipRender={this.renderTooltip.bind(this)} chartMouseMove={this.mouseMove.bind(this)} axisRangeCalculated={this.rangeCalculate.bind(this)} chartArea={{ border: { width: 0 } }} tooltip={{ enable: true, shared: true }} legendSettings={{ visible: false }} zoomSettings={{ enableMouseWheelZooming: true, mode: 'X', toolbarItems: [] }} crosshair={{
                enable: true
            }}>
                        <Inject services={[CandleSeries, DateTime, Crosshair, LineSeries, ChartAnnotation,
                StripLine, MomentumIndicator, Tooltip]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} width={2} type='Candle' xName='date' low='Low' high='High' close='Close' volume='Volume' open='Open' name='Bitcoin' yName='Close' animation={{ enable: false }} bearFillColor='#2ecd71' bullFillColor='#e74c3d'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                        <AnnotationsDirective>
                            <AnnotationDirective content={annotationTemplate} x='15%' y='25%' coordinateUnits='Pixel' region='Chart'>
                            </AnnotationDirective>
                        </AnnotationsDirective>
                    </ChartComponent>
                    </div>
                    <div className="row">
                 <RangeNavigatorComponent id='rangenavigator2' ref={rangenavigator => this.rangenavigator2 = rangenavigator} style={{ textAlign: "center" }} valueType='DateTime' labelPosition='Outside' width={Browser.isDevice ? '100%' : '80%'} value={[new Date('2016-05-15'), new Date('2018-05-15')]} load={this.rangeLoad2.bind(this)} changed={this.changed2.bind(this)}>
                    <Inject services={[DateTime, PeriodSelector, LineSeries]}/>
                    <RangenavigatorSeriesCollectionDirective>
                            <RangenavigatorSeriesDirective dataSource={data} xName='date' yName='Close' type='Line' width={1}>
                            </RangenavigatorSeriesDirective>
                        </RangenavigatorSeriesCollectionDirective>
                    </RangeNavigatorComponent>
                    </div>
                    <div id="action-description">
                        <p>
                        This sample illustrates a stock chart with candle series and a momentum indicator.
                        Period Selector shows the information about the stock chart range values.
                        </p>
                    </div>
                    <div id="description">
                        <p>
                        In this example, you can see how to render and configure the Period Selector.
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                        </p>
                        <br></br>
                            <p><b>Injecting Module</b></p>
                            <p>
                            Range Navigator component features are segregated into individual feature-wise modules. To use period selector,
                            <code>PeriodSelector</code> module using <code>RangeNavigator.Inject(PeriodSelector)</code> method.
                            </p>
                    </div>
            </div>
        </div>);
    }
    changed(args) {
        if (this.rangenavigator2 && this.range2Rendered) {
            this.rangenavigator2.rangeSlider.setSlider(args.start.getTime(), args.end.getTime(), false, false);
        }
        if (this.chart1 && this.chartRendered) {
            this.chart1.primaryXAxis.zoomFactor = 1;
            this.chart1.primaryXAxis.zoomPosition = 0;
            let filterData = data.filter((data) => {
                return ((data.date).getTime() >= args.start.getTime() && (data.date).getTime() <= args.end.getTime());
            });
            this.chart1.series[0].dataSource = filterData;
            this.chart1.refresh();
            this.chart1.setAnnotationValue(0, '<div id="annotation"></div>');
        }
        else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    }
    ;
    changed2(args) {
        if (this.rangenavigator1 && this.range1Rendered) {
            this.rangenavigator1.periodSelectorModule.datePicker.startDate = args.start;
            this.rangenavigator1.periodSelectorModule.datePicker.endDate = args.end;
            this.rangenavigator1.dataBind();
        }
        if (this.chart1 && this.chartRendered) {
            this.chart1.primaryXAxis.zoomFactor = 1;
            this.chart1.primaryXAxis.zoomPosition = 0;
            let filterData = data.filter((data) => {
                return ((data.date).getTime() >= args.start.getTime() && (data.date).getTime() <= args.end.getTime());
            });
            this.chart1.series[0].dataSource = filterData;
            this.chart1.setAnnotationValue(0, '<div id="annotation"></div>');
            this.chart1.refresh();
        }
        else {
            zoomFactor = args.zoomFactor;
            zoomPosition = args.zoomPosition;
        }
    }
    ;
    switchChanged(args) {
        if (this.chart1 && this.chartRendered) {
            this.chart1.series[0].type = !args.checked ? 'Line' : 'Candle';
            this.chart1.annotations[0].content = '';
            this.chart1.refresh();
        }
    }
    rangeLoaded(args) {
        let element = getElement('rangenavigator_Secondary_Element');
        if (!Browser.isDevice) {
            element.style.transform = 'translate(13%)';
        }
    }
    chartLoad(args) {
        args.chart.primaryXAxis.zoomFactor = zoomFactor;
        args.chart.primaryXAxis.zoomPosition = zoomPosition;
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        args.chart.tooltip.format = args.chart.series[0].type === 'Candle' ?
            '${point.x}<br/>High : <b>${point.high}</b><br/>Low : <b>${point.low}</b><br/>' +
                'Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b>' :
            '${point.x}<br/>Close : <b>${point.close}</b>';
        this.chartRendered = true;
    }
    ;
    rangeLoad(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        args.rangeNavigator.periodSelectorSettings.height = document.body.className.indexOf('e-bigger') > -1 ? 56 : 42;
        this.range1Rendered = true;
    }
    ;
    rangeLoad2(args) {
        let selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.rangeNavigator.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        args.rangeNavigator.dateTimeModule = new DateTime(args.rangeNavigator);
        this.range2Rendered = true;
    }
    ;
    labelRender(args) {
        if (args.axis.title === 'Price') {
            let value = Math.round(Number(args.text)) / 1000;
            args.text = '$' + String(value) + 'k';
        }
    }
    renderTooltip(args) {
        if (args.text.length > 0) {
            let text = args.text.split('<br/>');
            let html = '<table><thead>' + text[0] + '</thead>';
            let value;
            for (let i = 1; i < text.length; i++) {
                value = text[i].split(':');
                html += '<tr><td style="text-align:left;opacity:0.5">' + value[0] + ':</td><td style="padding-left: 5px;">$' +
                    (+value[1].split(' <b>')[1].split('</b>')[0]).toFixed(2) + '</td></tr>';
            }
            html += '</table>';
            this.chart1.setAnnotationValue(0, '<div id="annotation" style="line-height: 18px; font-size: 13px;background: #fff; opacity:0.9; color: #464e56; ' +
                ' box-shadow:0 0 8px 0 rgba(70,78,86,.25); padding: 7px 10px; border-radius: 3px">' + html + '</div>');
        }
        args.text = '';
    }
    ;
    mouseMove(args) {
        if (!withInBounds(this.chart1.mouseX, this.chart1.mouseY, this.chart1.chartAxisLayoutPanel.seriesClipRect)) {
            removeSecondaryElement();
        }
    }
    ;
    rangeCalculate(args) {
        if (this.chart1 && this.chartRendered) {
            this.chart1.setAnnotationValue(0, '<div></div>');
        }
    }
    ;
}
function removeSecondaryElement() {
    setTimeout(function () {
        if (getElement("annotation")) {
            remove(getElement("annotation"));
        }
    }, 2000);
}
