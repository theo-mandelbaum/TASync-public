import * as React from "react";
import { CircularGaugeComponent, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, Gradient } from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
export class Direction extends SampleBase {
    gauge;
    pointerColor;
    labelColor;
    pointerLinearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#ff6b78', offset: '0%', opacity: 0.9 },
            { color: '#e20a22', offset: '70%', opacity: 0.9 }
        ]
    };
    onLabelRender(args) {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    }
    ;
    load(args) {
    }
    render() {
        return (<main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <CircularGaugeComponent load={this.load.bind(this)} id='direction-gauge' background='transparent' ref={gauge => this.gauge = gauge} axisLabelRender={this.onLabelRender.bind(this)}>
                        <Inject services={[Gradient]}/>
                        <AxesDirective>
                            <AxisDirective radius='80%' startAngle={0} endAngle={360} minimum={0} maximum={8} majorTicks={{
                height: 15,
                interval: 1
            }} lineStyle={{ width: 20, color: '#E0E0E0' }} minorTicks={{
                height: 10,
                interval: 0.5
            }} labelStyle={{
                font: {
                    fontFamily: 'inherit'
                },
                autoAngle: true,
                offset: 10,
                hiddenLabel: 'Last'
            }}>
                                <PointersDirective>
                                    <PointerDirective value={7} radius='50%' color='#e20a22' pointerWidth={30} linearGradient={this.pointerLinearGradient} cap={{
                radius: 15,
                color: '#ffffff',
                border: {
                    width: 0
                }
            }} animation={{
                enable: false
            }}/>
                                    <PointerDirective value={3} radius='50%' color='#f7f7f7' pointerWidth={30} cap={{
                radius: 15, color: '#ffffff', border: {
                    width: 0
                }
            }} animation={{
                enable: false
            }}/>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </CircularGaugeComponent>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>
                        This sample demonstrates how to create a direction compass by modifying the circular gauge's functionalities to meet the needs of the user.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>
                        In this example, a direction compass has been depicted by adding a couple of needle pointers in the circular gauge and customizing labels to show the direction.
                    </p>
                    <p>
                        More information on the circular gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
                    </p>
                </section>
        </main>);
    }
}
