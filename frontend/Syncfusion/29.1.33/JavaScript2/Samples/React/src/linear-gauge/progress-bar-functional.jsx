import * as React from "react";
import { useEffect } from "react";
import { LinearGaugeComponent, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations, AnnotationsDirective } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;
const ProgressBar = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args) => {
    };
    return (<main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <LinearGaugeComponent load={load.bind(this)} animationDuration={2000} background='transparent' id='gauge' orientation='Horizontal' container={{ width: 30, roundedCornerRadius: 20, backgroundColor: '#D6D6D6', type: 'RoundedRectangle', border: { width: 1 } }}>
                    <Inject services={[Annotations]}/>
                    <AxesDirective>
                        <AxisDirective minimum={0} maximum={100} line={{ width: 0 }} minorTicks={{ interval: 1, height: 0 }} majorTicks={{ interval: 10, height: 0 }} labelStyle={{ font: { size: '0px' } }}>
                            <PointersDirective>
                                <PointerDirective value={41} height={30} width={30} color='#2196F3' type='Bar' roundedCornerRadius={20}/>
                            </PointersDirective>
                        </AxisDirective>
                    </AxesDirective>
                    <AnnotationsDirective>
                        <AnnotationDirective content='<div style="font-size: 15px;color: white;margin-top: 28px;margin-left:50%">41%</div>' axisIndex={0} axisValue={10} x={0} zIndex='1' y={0}/>
                    </AnnotationsDirective>
                </LinearGaugeComponent>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Linear Gauge sample">
                <p>This sample shows a linear gauge that resembles a progress bar and indicates a task completion rate of 41%.</p>
            </section>
            <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                <p>In this example, you can see how to render and configure a new progress bar using the linear gauge. This can be accomplished by combining axis, pointer, and annotation.</p>
                <p>
                    More information on the linear gauge can be found in this  <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/">documentation section</a>.
                </p>
            </section>
    </main>);
};
export default ProgressBar;
