import * as React from 'react';
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, Annotations, PointersDirective, PointerDirective, AnnotationsDirective, AnnotationDirective } from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { CircularGauge } from '@syncfusion/ej2-circulargauge';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class AxisBackGround extends SampleBase {
    annotationGauge;
    load(args) {
    }
    updateGauge() {
        this.annotationGauge = new CircularGauge({
            width: '600px',
            height: '450px',
            background: 'transparent',
            axes: [{
                    labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', color: 'White' } },
                    majorTicks: { height: 15, interval: 30 },
                    minorTicks: { height: 10, interval: 6 }, minimum: 0, maximum: 360,
                    pointers: [{
                            value: 90,
                            description: 'Marker pointer value : 90',
                            radius: '45%', markerWidth: 12, markerHeight: 12,
                            type: 'Marker', markerShape: 'Triangle', color: 'Orange',
                            animation: { enable: true, duration: 500 }
                        }], startAngle: 0, endAngle: 0, radius: '60%', lineStyle: { width: 0 }
                }]
        });
        this.annotationGauge.appendTo('#subGauge');
    }
    onChartLoad(args) {
        this.updateGauge();
    }
    ;
    onResized(args) {
        location.reload();
    }
    render() {
        return (<main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent loaded={this.onChartLoad.bind(this)} resized={this.onResized.bind(this)} load={this.load.bind(this)} id='axis-background' background='transparent' centerY='65%'>
                        <Inject services={[Annotations]}/>
                        <AxesDirective>
                            <AxisDirective startAngle={0} endAngle={0} radius='80%' majorTicks={{
                height: 0,
            }} lineStyle={{ width: 0 }} minorTicks={{
                height: 0,
            }} labelStyle={{
                format: '{value} %',
                font: { size: '0px' }
            }}>
                                <PointersDirective>
                                    <PointerDirective radius='0%'/>
                                </PointersDirective>
                                <AnnotationsDirective>
                                    <AnnotationDirective description='Axis background' content='<div style="margin-top: -37%;"><img src="src/circular-gauge/images/axis-background.png" height="400" width="400" /></div>' angle={0} radius='0%' zIndex='1'/>
                                    <AnnotationDirective content='<div id="subGauge" style="margin-left: -50%; margin-top: -50%;"></div>' description='Sub gauge' angle={0} radius='0%' zIndex='1'/>
                                    <AnnotationDirective content='<div style="color:orange;margin-top: -86px;margin-left: -1px;font-size: 18px;"> 90</div>' description='Annotation value : 90' angle={10} radius='0%' zIndex='1'/>
                                </AnnotationsDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>
                        This sample demonstrates a circular gauge with an axis and a background image set for the axis.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to render and configure the axis in the circular gauge with a background image. To accomplish this, the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/">annotations</a> is used and an image is set as the background content.
                    </p>
                    <p>
                        More information on the annotations can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-annotations/">documentation section</a>.
                    </p>
                </section>
        </main>);
    }
}
