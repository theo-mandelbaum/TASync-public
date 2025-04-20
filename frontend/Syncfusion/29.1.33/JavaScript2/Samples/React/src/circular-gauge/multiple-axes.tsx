import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { PropertyPane } from '../common/property-pane';
import {
    CircularGaugeComponent, AxesDirective, AxisDirective, Inject, isCompleteAngle,
    PointersDirective, PointerDirective, ILoadedEventArgs, GaugeTheme
} from '@syncfusion/ej2-react-circulargauge';
import { SampleBase } from '../common/sample-base';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }`;

export class Axes extends SampleBase<{}, {}> {

    private gauge: CircularGaugeComponent;
    private start: HTMLInputElement;
    private end: HTMLInputElement;
    private axisIndex: number = 0;
    private loaded: boolean = false;
    public axis: DropDownList;
    public direction: DropDownList;

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as GaugeTheme;
        // custom code end
    }

    public onChartLoad(args: ILoadedEventArgs): void {
        let id: string = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        if (!this.loaded) {
            this.loaded = true;
            this.axis = new DropDownList({
                index: 0, width: '127%',
                change: () => {
                    this.axisIndex = +this.axis.value;
                    this.direction.value = this.gauge.axes[this.axisIndex].direction;
                    let startAngle: number = this.gauge.axes[this.axisIndex].startAngle;
                    let endAngle: number = this.gauge.axes[this.axisIndex].endAngle;
                    document.getElementById('start').innerHTML = String(startAngle);
                    document.getElementById('end').innerHTML = String(endAngle);
                    this.start.value = startAngle.toString();
                    this.end.value = endAngle.toString();
                }
            });
            this.axis.appendTo('#axisIndex');

            this.direction = new DropDownList({
                index: 0, width: '127%',
                change: () => {
                    this.gauge.axes[this.axisIndex].direction = this.direction.value == 'ClockWise' ? 'ClockWise' : 'AntiClockWise';
                    this.gauge.axes[0].pointers[0].animation.enable = false;
                    this.gauge.axes[1].pointers[0].animation.enable = false;
                    this.gauge.refresh();
                }
            });
            this.direction.appendTo('#axisDirection');
        }
    };

    public startAngle(): void {
        let value: number = +this.start.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].startAngle = value;
        document.getElementById('start').innerHTML = String(value);
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            isCompleteAngle(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    }

    public endAngle(): void {
        let value: number = +this.end.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].endAngle = value;
        document.getElementById('end').innerHTML = String(value);
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            isCompleteAngle(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <CircularGaugeComponent load={this.load.bind(this)} id='range-container' background='transparent' ref={gauge => this.gauge = gauge}
                            loaded={this.onChartLoad.bind(this)}>
                            <AxesDirective>
                                <AxisDirective
                                    lineStyle={{ width: 1.5 }}
                                    radius='95%'
                                    direction='ClockWise'
                                    startAngle={220} endAngle={140}
                                    minimum={0} maximum={160}
                                    majorTicks={{
                                        position: 'Inside',
                                        width: 2, height: 10
                                    }}
                                    minorTicks={{
                                        position: 'Inside', width: 2,
                                        height: 5
                                    }} labelStyle={{
                                        position: 'Inside', autoAngle: true,
                                        font: {
                                            fontFamily: 'inherit'
                                        }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={80} radius='100%'
                                            markerHeight={15} markerWidth={15} type='Marker'
                                            markerShape='Triangle' />
                                    </PointersDirective>
                                </AxisDirective>
                                <AxisDirective
                                    lineStyle={{ width: 1.5, color: ' #E84011' }}
                                    radius='95%'
                                    direction='ClockWise'
                                    startAngle={220} endAngle={140}
                                    minimum={0} maximum={240}
                                    majorTicks={{
                                        position: 'Outside', width: 2, height: 10,
                                        color: '#E84011'
                                    }}
                                    minorTicks={{
                                        position: 'Outside', width: 2,
                                        height: 5, color: '#E84011'
                                    }} labelStyle={{
                                        position: 'Outside', autoAngle: true, offset: 5,
                                        font: { fontFamily: 'inherit' }
                                    }}>
                                    <PointersDirective>
                                        <PointerDirective value={120} radius='100%' color='#E84011'
                                            markerHeight={15} markerWidth={15} type='Marker'
                                            markerShape='InvertedTriangle' />
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </CircularGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: "-10px" }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div style={{ fontSize: '14px' }}> Axis </div>
                                        </td>
                                        <td style={{ width: '40% ' }}>
                                            <div>
                                                <select id="axisIndex" className="form-control" style={{ width: "90%" }}>
                                                    <option value="0">Axis 1</option>
                                                    <option value="1">Axis 2</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div style={{ fontSize: '14px' }}> Direction </div>
                                        </td>
                                        <td style={{ width: '40% ' }}>
                                            <div>
                                                <select id="axisDirection" className="form-control" style={{ width: "90%" }}>
                                                    <option value="ClockWise">Clockwise</option>
                                                    <option value="AntiClockWise">Anti-clockwise</option>
                                                </select>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div style={{ fontSize: '14px' }}>Start Angle </div>
                                        </td>
                                        <td style={{ width: '40% ' }}>
                                            <div>
                                                <input type="range" id="startAngle" onChange={this.startAngle.bind(this)} ref={d => this.start = d} defaultValue="220" min="0" max="360" style={{ width: "90%" }} />
                                            </div>
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <div style={{ textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' }}>
                                                <span id='start'>220</span>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr style={{ height: '50px' }}>
                                        <td>
                                            <div style={{ fontSize: '14px' }}>End Angle </div>
                                        </td>
                                        <td style={{ width: '40% ' }}>
                                            <div>
                                                <input type="range" id="endAngle" onChange={this.endAngle.bind(this)} ref={d => this.end = d} defaultValue="140" min="0" max="360" style={{ width: "90%" }} />
                                            </div>
                                        </td>
                                        <td style={{ width: "10%" }}>
                                            <div style={{ textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' }}>
                                                <span id='end'>140</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div>
                <section id="action-description" aria-label="Description of Circular Gauge sample">
                    <p>
                        This sample illustrates the multiple axes in the circular gauge as well as the options for changing the direction, start, and end angle of an axis.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Circular Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to render and configure multiple axes in the circular gauge. To render multiple axes in the circular gauge, use the axes collection, and each axis can be customized with pointers and ticks.
                    </p>
                    <p>
                        More information on the multiple axes can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/#multiple-axes">documentation section</a>.
                    </p>
                </section>
            </main>
        )
    }
}