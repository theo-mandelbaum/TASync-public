import * as React from "react";
import { useEffect } from "react";
import { LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective, Inject, PointersDirective, PointerDirective, AnnotationDirective, Annotations, AnnotationsDirective } from '@syncfusion/ej2-react-lineargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }`;

const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as LinearGaugeTheme;
        // custom code end
    }

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <LinearGaugeComponent load={load.bind(this)} background='transparent' id='gauge' orientation='Horizontal'>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective minorTicks={{ interval: 2, height: 10, color: '#9E9E9E' }} majorTicks={{ interval: 10, height: 20, color: '#9E9E9E' }} labelStyle={{ offset: 48, font: { fontFamily: 'inherit' } }}>
                            <PointersDirective>
                                <PointerDirective value={10} placement='Near' height={15} width={15} offset={-40} markerType='Triangle'>
                                </PointerDirective>
                            </PointersDirective>
                        </AxisDirective>
                    </AxesDirective>
                    <AnnotationsDirective>
                        <AnnotationDirective content='<div style="width: 70px;margin-top: 25%;font-size: 16px;">10 MPH</div>' axisIndex={0} axisValue={10} x={10} zIndex='1' y={-70} />
                    </AnnotationsDirective>
                </LinearGaugeComponent>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Linear Gauge sample">
                <p>This sample shows the linear gauge's basic rendering, which includes an axis, a pointer, major ticks, minor ticks and annotation.</p>
            </section>
            <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                <p>The linear gauge control shows scale values in either horizontal or vertical orientation. Axis, range, ticks, pointer, and container properties can be used to customize the basic appearance of the linear gauge.</p>
                <p>
                    More information on the linear gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/">documentation section</a>.
                </p>
            </section>
    </main>
    )
}
export default Default;
