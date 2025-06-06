import * as React from "react";
import { LinearGaugeComponent, AxesDirective, AxisDirective, Inject, PointersDirective, Gradient, PointerDirective, RangesDirective, RangeDirective } from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }`;
export class Ranges extends SampleBase {
    defaultRange;
    exponentialRange;
    concaveRange;
    gradientRange;
    multipleRange;
    load(args) {
    }
    horizontalGauge(e) {
        this.defaultRange.width = this.exponentialRange.width = this.concaveRange.width = this.gradientRange.width = this.multipleRange.width = '450px';
        this.defaultRange.height = this.exponentialRange.height = this.concaveRange.height = this.gradientRange.height = this.multipleRange.height = '150px';
        this.defaultRange.orientation = this.exponentialRange.orientation = this.concaveRange.orientation = this.gradientRange.orientation = this.multipleRange.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerExponential').className =
                document.getElementById('containerConcave').className = document.getElementById('containerGradient').className =
                    document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    }
    verticalGauge(e) {
        this.defaultRange.width = this.exponentialRange.width = this.concaveRange.width = this.gradientRange.width = this.multipleRange.width = '150px';
        this.defaultRange.height = this.exponentialRange.height = this.concaveRange.height = this.gradientRange.height = this.multipleRange.height = '350px';
        this.defaultRange.orientation = this.exponentialRange.orientation = this.concaveRange.orientation = this.gradientRange.orientation = this.multipleRange.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerExponential').className =
                document.getElementById('containerConcave').className = document.getElementById('containerGradient').className =
                    document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "4%";
        }
    }
    rangeLinearGradient = {
        startValue: "0%",
        endValue: "100%",
        colorStop: [
            { color: "#FB7D55", offset: "0%", opacity: 1 },
            { color: "#ECC85B", offset: "50%", opacity: 1 },
            { color: "#6FC78A", offset: "100%", opacity: 1 }
        ]
    };
    render() {
        return (<main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section">
                    <div className="col-xs-12 col-sm-12 col-lg-12 col-md-12" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{ margin: 'auto', padding: '10px' }}>
                            <table role='none'>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div id='horizontal' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: 'black', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: 'white', textAlign: 'center' }} onClick={this.horizontalGauge.bind(this)}>Horizontal</div>
                                        </td>
                                        <td>
                                            <div id='vertical' style={{ padding: '6px', cursor: 'pointer', width: '86px', color: 'white', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: '#0074E3', textAlign: 'center' }} onClick={this.verticalGauge.bind(this)}>Vertical</div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <pre style={{ border: 'hidden', backgroundColor: 'inherit' }}></pre>
                    <div id="containerBox" style={{ float: 'left', padding: '4%' }}></div>
                    <div id='containerDefault' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} id='defaultRange' title='Default' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} orientation='Vertical' width='150px' height='350px' background='transparent' ref={defaultRange => this.defaultRange = defaultRange}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={0}>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={100} startWidth={10} endWidth={10} color='#F45656' offset={5}>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerExponential' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Exponential' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='exponentialRange' orientation='Vertical' width='150px' height='350px' background='transparent' ref={exponentialRange => this.exponentialRange = exponentialRange}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={0}>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={50} startWidth={2} endWidth={15} color='#F45656' offset={5}>
                                        </RangeDirective>
                                        <RangeDirective start={50} end={100} startWidth={15} endWidth={50} color='#F45656' offset={5}>
                                        </RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerConcave' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Concave' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='concaveRange' orientation='Vertical' width='150px' height='350px' background='transparent' ref={concaveRange => this.concaveRange = concaveRange}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={0}>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={50} color='#F45656' startWidth={50} endWidth={20} offset={5}></RangeDirective>
                                        <RangeDirective start={50} end={100} color='#F45656' startWidth={20} endWidth={50} offset={5}></RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerGradient' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Gradient shader' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='gradientRange' orientation='Vertical' width='150px' height='350px' background='transparent' ref={gradientRange => this.gradientRange = gradientRange}>
                            <Inject services={[Gradient]}/>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={0}>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={100} startWidth={50} endWidth={50} offset={5} linearGradient={this.rangeLinearGradient}></RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    <div id='containerMultiple' className="col-xs-4 col-sm-4 col-lg-2 col-md-2" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <LinearGaugeComponent load={this.load.bind(this)} animationDuration={2000} title='Multiple ranges' titleStyle={{ fontFamily: 'inherit', fontWeight: '499' }} id='multipleRange' orientation='Vertical' width='150px' height='350px' background='transparent' ref={multipleRange => this.multipleRange = multipleRange}>
                            <AxesDirective>
                                <AxisDirective line={{ width: 5 }} minorTicks={{ interval: 10, height: 3, position: 'Outside' }} majorTicks={{ interval: 20, height: 7, width: 1, position: 'Outside' }} labelStyle={{ position: 'Outside', font: { fontFamily: 'inherit' } }} minimum={0} maximum={100} opposedPosition={true}>
                                    <PointersDirective>
                                        <PointerDirective width={0}>
                                        </PointerDirective>
                                    </PointersDirective>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={30} color='#FB7D55' startWidth={50} endWidth={50} offset={5}></RangeDirective>
                                        <RangeDirective start={30} end={65} color='#ECC85B' startWidth={50} endWidth={50} offset={5}></RangeDirective>
                                        <RangeDirective start={65} end={100} color='#6FC78A' startWidth={50} endWidth={50} offset={5}></RangeDirective>
                                    </RangesDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Linear Gauge sample">
                    <p>
                        This sample demonstrates the various customization options for the linear gauge's range. For example, an exponential appearance, a gradient color, and a multiple range.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to render and configure ranges in the linear gauge. The <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/rangeModel/">RangesDirective</a>, <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/rangeModel/">RangeDirective</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/linearGradientModel/">linearGradient</a> are used to display multiple ranges, perform range customization, and apply gradient colors, respectively.
                    </p>
                    <p>
                        More information on the ranges can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/ranges/">documentation section</a>.
                    </p>
                </section>
        </main>);
    }
}
