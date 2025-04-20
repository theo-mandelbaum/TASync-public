import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { CircularGaugeComponent, GaugeTheme, AxesDirective, AxisDirective, Inject, IAxisLabelRenderEventArgs, AnnotationDirective, PointersDirective, PointerDirective, RangesDirective, RangeDirective, AnnotationsDirective, Annotations } from '@syncfusion/ej2-react-circulargauge';
import { CheckBoxComponent } from "@syncfusion/ej2-react-buttons";
import { PropertyPane } from '../common/property-pane';
import { ILoadedEventArgs } from '@syncfusion/ej2-circulargauge';
import { updateSampleSection } from '../common/sample-base';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

var style1 = {
    'height': '0px',
    'width': '0px'
}

var style2 = {
    'stopColor': '#82b944',
    'stopOpacity': 1
}

var style3 = {
    'stopColor': 'rgb(255,255,0)',
    'stopOpacity': 1
}

var style4 = {
    'stopColor': 'red',
    'stopOpacity': 1
}

const Speedometer = () => {

    useEffect(() => {
        updateSampleSection();
    }, [])

    let gauge = useRef<CircularGaugeComponent>(null);
    let rangeElement = useRef<CheckBoxComponent>(null);
    let gapElement = useRef<CheckBoxComponent>(null);
    let pointerInterval: Object;
    let pointerValue: number = 40;

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
        // custom code end
    }

    const loaded = (args: ILoadedEventArgs): void => {
        pointerInterval = setInterval(
            (): void => {
                if (document.getElementById('container')) {
                    let dynamicPointerValue: number = Math.abs(pointerValue + ((Math.random() * 20) - 10));
                    if (gauge && gauge.current) {
                        gauge.current.setPointerValue(0, 0, dynamicPointerValue);
                        gauge.current.setAnnotationValue(0, 0, '<div style="width:90px;text-align:center;font-size:20px;font-family:inherit">' + Math.round(dynamicPointerValue).toString() + 'km/h' + '</div>');
                    }
                } else {
                    clearInterval(+pointerInterval);
                }
            }, 2000)
    }

    const rangeChange = () => {
        if (rangeElement.current.checked === true) {
            gapElement.current.disabled = true;
            gauge.current.axes[0].ranges[0].start = 0;
            gauge.current.axes[0].ranges[0].end = 120;
            gauge.current.axes[0].ranges[0].startWidth = 5;
            gauge.current.axes[0].ranges[0].endWidth = 35;
            gauge.current.axes[0].ranges[0].color = 'url(#grad1)';
            gauge.current.axes[0].ranges[1].start = null;
            gauge.current.axes[0].ranges[1].end = null;
            gauge.current.axes[0].ranges[1].startWidth = '';
            gauge.current.axes[0].ranges[1].endWidth = '';
            gauge.current.axes[0].ranges[1].color = '';
            gauge.current.axes[0].ranges[2].start = null;
            gauge.current.axes[0].ranges[2].end = null;
            gauge.current.axes[0].ranges[2].startWidth = '';
            gauge.current.axes[0].ranges[2].endWidth = '';
            gauge.current.axes[0].ranges[2].color = '';
            gauge.current.axes[0].ranges[3].start = null;
            gauge.current.axes[0].ranges[3].end = null;
            gauge.current.axes[0].ranges[3].startWidth = '';
            gauge.current.axes[0].ranges[3].endWidth = '';
            gauge.current.axes[0].ranges[3].color = '';
            gauge.current.axes[0].ranges[4].start = null;
            gauge.current.axes[0].ranges[4].end = null;
            gauge.current.axes[0].ranges[4].startWidth = '';
            gauge.current.axes[0].ranges[4].endWidth = '';
            gauge.current.axes[0].ranges[4].color = '';
            gauge.current.axes[0].ranges[5].start = null;
            gauge.current.axes[0].ranges[5].end = null;
            gauge.current.axes[0].ranges[5].startWidth = '';
            gauge.current.axes[0].ranges[5].endWidth = '';
            gauge.current.axes[0].ranges[5].color = '';
            gauge.current.refresh();
        } else {
            gapElement.current.disabled = false;
            gauge.current.axes[0].ranges[0].start = 0;
            gauge.current.axes[0].ranges[0].end = 20;
            gauge.current.axes[0].ranges[0].startWidth = 5;
            gauge.current.axes[0].ranges[0].endWidth = 10;
            gauge.current.axes[0].ranges[0].color = '#82b944';
            gauge.current.axes[0].ranges[1].start = 20;
            gauge.current.axes[0].ranges[1].end = 40;
            gauge.current.axes[0].ranges[1].startWidth = 10;
            gauge.current.axes[0].ranges[1].endWidth = 15;
            gauge.current.axes[0].ranges[1].color = '#a1cb43';
            gauge.current.axes[0].ranges[2].start = 40;
            gauge.current.axes[0].ranges[2].end = 60;
            gauge.current.axes[0].ranges[2].startWidth = 15;
            gauge.current.axes[0].ranges[2].endWidth = 20;
            gauge.current.axes[0].ranges[2].color = '#ddec12';
            gauge.current.axes[0].ranges[3].start = 60;
            gauge.current.axes[0].ranges[3].end = 80;
            gauge.current.axes[0].ranges[3].startWidth = 20;
            gauge.current.axes[0].ranges[3].endWidth = 25;
            gauge.current.axes[0].ranges[3].color = '#ffbc00';
            gauge.current.axes[0].ranges[4].start = 80;
            gauge.current.axes[0].ranges[4].end = 100;
            gauge.current.axes[0].ranges[4].startWidth = 25;
            gauge.current.axes[0].ranges[4].endWidth = 30;
            gauge.current.axes[0].ranges[4].color = '#ff6000';
            gauge.current.axes[0].ranges[5].start = 100;
            gauge.current.axes[0].ranges[5].end = 120;
            gauge.current.axes[0].ranges[5].startWidth = 30;
            gauge.current.axes[0].ranges[5].endWidth = 35;
            gauge.current.axes[0].ranges[5].color = 'red';
            gauge.current.refresh();
        }
    }

    const gapChange = () => {
        if (gapElement.current.checked) {
            gauge.current.axes[0].rangeGap = 5;
        } else {
            gauge.current.axes[0].rangeGap = null;
        }
        gauge.current.refresh();
    }

    return (
        <main><div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='col-lg-8 control-section'>
                <svg style={style1}>
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" style={style2} />
                            <stop offset="50%" style={style3} />
                            <stop offset="100%" style={style4} />
                        </linearGradient>
                    </defs>
                </svg>
                <CircularGaugeComponent title='Speedometer' titleStyle={{ size: '18px', fontFamily: 'inherit' }} background='transparent' centerY='75%' load={load.bind(this)} loaded={loaded.bind(this)} ref={gauge} id='container'>
                    <Inject services={[Annotations]} />
                    <AxesDirective>
                        <AxisDirective radius='120%' startAngle={270} endAngle={90} minimum={0} maximum={120} lineStyle={{ width: 0 }} labelStyle={{ font: { size: '13px', fontFamily: 'inherit' }, position: 'Outside', autoAngle: true }} majorTicks={{ width: 0 }} minorTicks={{ width: 0 }}>
                            <PointersDirective>
                                <PointerDirective animation={{ enable: false }} value={40} radius='80%' color='#757575' pointerWidth={7} cap={{ radius: 8, color: '#757575', border: { width: 0 } }} needleTail={{ color: '#757575', length: '15%' }} />
                            </PointersDirective>
                            <AnnotationsDirective>
                                <AnnotationDirective content='<div style="width:90px;text-align:center;font-size:20px;font-family:inherit">40 km/h</div>' angle={0} zIndex='1' radius='30%' />
                            </AnnotationsDirective>
                            <RangesDirective>
                                <RangeDirective start={0} end={20} startWidth={5} endWidth={10} radius='102%' color='#82b944' />
                                <RangeDirective start={20} end={40} startWidth={10} endWidth={15} radius='102%' color='#a1cb43' />
                                <RangeDirective start={40} end={60} startWidth={15} endWidth={20} radius='102%' color='#ddec12' />
                                <RangeDirective start={60} end={80} startWidth={20} endWidth={25} radius='102%' color='#ffbc00' />
                                <RangeDirective start={80} end={100} startWidth={25} endWidth={30} radius='102%' color='#ff6000' />
                                <RangeDirective start={100} end={120} startWidth={30} endWidth={35} radius='102%' color='red' />
                            </RangesDirective>
                        </AxisDirective>
                    </AxesDirective>
                </CircularGaugeComponent>
            </div>
            {/* Property Panel */}
            <div className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                    <table id='property' role='none' title='Properties' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%', fontSize: '14px' }}>
                                    <div>Combine Ranges</div>
                                </td>
                                <td>
                                    <div>
                                        <CheckBoxComponent id='combineRange' change={rangeChange.bind(this)} ref={rangeElement} />
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '35px' }}>
                                <td style={{ width: '60%', fontSize: '14px' }}>
                                    <div>Gap Between Ranges</div>
                                </td>
                                <td>
                                    <div>
                                        <CheckBoxComponent id='range' change={gapChange.bind(this)} ref={gapElement} />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Circular Gauge sample">
                <p>This sample depicts the appearance of a speedometer rendered using the circular gauge. The pointer value is dynamically updated with random values in this case.</p>
            </section>
            <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                <p>In this example, you can see how to make a circular gauge look like a speedometer. Using the options in the properties panel, a gap can be added between ranges or ranges can be combined to form a single range.</p>
                <p>
                    More information on the circular gauge can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/">documentation section </a>.
                </p>
            </section>
        </main>
    )
}
export default Speedometer;