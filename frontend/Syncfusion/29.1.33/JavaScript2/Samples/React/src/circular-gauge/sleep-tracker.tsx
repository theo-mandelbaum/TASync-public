import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, IAxisLabelRenderEventArgs, AnnotationsDirective, AnnotationDirective,
    PointersDirective, PointerDirective, RangesDirective, RangeDirective, ILoadedEventArgs, GaugeTheme
} from '@syncfusion/ej2-react-circulargauge';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
import { SampleBase } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class SleepTracker extends SampleBase<{}, {}> {

    public gauge: CircularGauge;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
        // custom code end
    }

    public axisLabelRender(args: IAxisLabelRenderEventArgs): void {
        if (args.value == 3 || args.value == 6 || args.value == 9 || args.value == 12) {
            args.text = args.value.toString();
        }
        else {
            args.text = "";
        }
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent load={this.load.bind(this)} axisLabelRender={this.axisLabelRender.bind(this)} id='custom-labels' ref={gauge => this.gauge = gauge} background='transparent'>
                        <Inject services={[Annotations]} />
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={0} radius='70%' minimum={0} maximum={12}
                                majorTicks={{
                                    width: 2, height: 12, interval: 1, offset: 4
                                }} lineStyle={{ width: 0 }}
                                minorTicks={{
                                    width: 1, height: 7, interval: 0.2, offset: 4
                                }} labelStyle={{
                                    hiddenLabel: 'First',
                                    font: {
                                        fontFamily: 'inherit'
                                    }
                                }}>
                                <PointersDirective>
                                    <PointerDirective type="Marker" value={4.7} markerShape='Image' radius='97%' markerWidth={28} markerHeight={28} imageUrl="src/circular-gauge/images/sun-icon.png"
                                        animation={{
                                            enable: false
                                        }}>
                                    </PointerDirective>
                                    <PointerDirective type="Marker" value={9} markerShape='Image' radius='98%' markerWidth={28} markerHeight={28} imageUrl="src/circular-gauge/images/moon-icon.png"
                                        animation={{
                                            enable: false
                                        }}>
                                    </PointerDirective>
                                </PointersDirective>
                                <RangesDirective>
                                    <RangeDirective start={0} end={4.7} startWidth={4} endWidth={4} color='#6453D0'></RangeDirective>
                                    <RangeDirective start={12} end={9} startWidth={4} endWidth={4} color='#6453D0'></RangeDirective>
                                    <RangeDirective start={4.7} end={9} startWidth={4} endWidth={4} color='#d7d3ed'></RangeDirective>
                                </RangesDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective
                                        description='Mon, 5 Apr' content='<div style="font-size:15px;border-radius: 20px;border: 2px solid gray;padding: 5px 4px 5px;width: 93%;text-align: center;margin-left: 67px;">Mon, 5 Apr</div>'
                                        angle={342} radius='129%' zIndex='1' />
                                    <AnnotationDirective content='<div style="font-size:15px;margin-left:25px">07 hrs 43 mins</div>'
                                        description='07 hrs 43 mins' angle={185} radius='120%' zIndex='1' />
                                    <AnnotationDirective content='<div style="font-size:15px;margin-left: 34px;">Sleep Time</div>'
                                        description='Sleep time' angle={185} radius='140%' zIndex='1' />
                                    <AnnotationDirective content='<div style="color:#6453D0;font-size:15px;margin-top: 54px;margin-left:28px"><p style="text-align: center;">4 Apr</p><p style="margin-top: -10px;">9:00 PM</p></div>'
                                        description='4 Apr 9:00 PM' angle={285} radius='60%' zIndex='1' />
                                    <AnnotationDirective content='<div style="color:#6453D0;margin-top: -8px;"> - </div>'
                                        description='-' angle={0} radius='0%' zIndex='1' />
                                    <AnnotationDirective content='<div style="color:#6453D0;font-size:15px;margin-left: -15px;margin-top: 56px;"><p style="text-align: center;">5 Apr </p><p style="margin-top: -10px;">4:43 AM</p></div>'
                                        description='5 Apr 4:43 AM' angle={70} radius='50%' zIndex='1' />
                                </AnnotationsDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
            </div >
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>
                        This sample represents the number of hours slept by a person using a sleep tracker. The sleep tracker also displays the start and end time of each sleep cycle.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to make the circular gauge look like a sleep tracker. Additionally, the date, start and end time, and duration of sleep are all displayed.
                    </p>
                    <p>
                        More information on the circular gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
                    </p>
                </section>
            </main>
        )
    }
}