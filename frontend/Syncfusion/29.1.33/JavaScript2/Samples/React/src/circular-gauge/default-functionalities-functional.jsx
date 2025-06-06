import * as React from "react";
import { useEffect } from "react";
import { CircularGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-circulargauge';
import { updateSampleSection } from '../common/sample-base';
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;
const Default = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const load = (args) => {
    };
    return (<main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section'>
                <CircularGaugeComponent animationDuration={2000} load={load.bind(this)} id='gauge' background="transparent">
                    <AxesDirective>
                        <AxisDirective radius='80%' startAngle={230} endAngle={130} majorTicks={{ offset: 5 }} lineStyle={{ width: 8, color: '#E0E0E0' }} minorTicks={{ offset: 5 }} labelStyle={{ font: { fontFamily: 'inherit' }, offset: -1 }}>
                            <PointersDirective>
                                <PointerDirective value={60} radius='60%' pointerWidth={7} color='#c06c84' animation={{ enable: true, duration: 500 }} cap={{ radius: 8, color: '#c06c84', border: { width: 0 } }} needleTail={{ length: '0%' }}/>
                            </PointersDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Circular Gauge sample">
                <p>This sample shows the circular gauge's basic rendering, which includes an axis and a pointer.</p>
            </section>
            <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                <p>
                    In this example, an axis with a pointer is used, and you can use <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel/'>AxesDirective</a> and <a target='_blank' href='https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/'>PointersDirective</a> to get the circular gauge's basic appearance. The circular gauge component helps in the visualization of numerical scale values on a circular scale.
                </p>
                <p>
                    More information on the circular gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section</a>.
                </p>
            </section>
    </main>);
};
export default Default;
