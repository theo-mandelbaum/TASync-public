import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { LinearGaugeComponent, AxesDirective, AxisDirective, PointersDirective, PointerDirective } from '@syncfusion/ej2-react-lineargauge';
import { PropertyPane } from '../common/property-pane';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
const Container = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [orientation, setOrientation] = useState('Vertical');
    const [containerType, setContainerType] = useState('Thermometer');
    let gaugeInstance = useRef(null);
    let orientationElement = useRef(null);
    let containerElement = useRef(null);
    let droplist = [
        { value: 'Vertical' },
        { value: 'Horizontal' }
    ];
    let modelist = [
        { value: 'Thermometer', text: 'Thermometer' },
        { value: 'Normal', text: 'Normal' },
        { value: 'RoundedRectangle', text: 'Rounded Rectangle' }
    ];
    const load = (args) => {
    };
    const orienatationChange = (args) => {
        setOrientation(args.value);
    };
    const containerChange = (args) => {
        setContainerType(args.value);
    };
    return (<main><div className='control-pane'>
            <div className='control-section row'>
                <div className='col-lg-8'>
                    <LinearGaugeComponent orientation={orientation} load={load.bind(this)} id='gauge' background='transparent' ref={gaugeInstance} title='Temperature Measure' titleStyle={{ fontFamily: 'inherit' }} container={{ width: 13, type: containerType, roundedCornerRadius: 5 }}>
                        <AxesDirective>
                            <AxisDirective minimum={0} maximum={180} line={{ width: 0 }} minorTicks={{ color: '#9e9e9e', height: 10, interval: 10 }} majorTicks={{ interval: 20, color: '#9e9e9e', height: 20 }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective value={90} height={13} width={13} type='Bar' color='#f02828'/>
                                </PointersDirective>
                            </AxisDirective>
                            <AxisDirective minimum={0} maximum={180} opposedPosition={true} line={{ width: 0 }} majorTicks={{ color: '#9e9e9e', interval: 20, height: 20 }} minorTicks={{ height: 10, interval: 10, color: '#9e9e9e' }} labelStyle={{ font: { fontFamily: 'inherit' } }}>
                                <PointersDirective>
                                    <PointerDirective width={0}/>
                                </PointersDirective>
                            </AxisDirective>
                        </AxesDirective>
                    </LinearGaugeComponent>
                </div>
                <div className='col-lg-4 property-section'>
                    {/* Property Panel */}
                    <PropertyPane title='Properties'>
                        <table id='property' role="none" title='Properties' className='property-panel-table' style={{ width: '100%', marginTop: '5px' }}>
                            <colgroup>
                                <col span={1} style={{ width: "40%" }}></col>
                                <col span={1} style={{ width: "60%" }}></col>
                            </colgroup>
                            <tbody>
                            <tr style={{ height: '42px' }}>
                                <td>
                                    <div style={{ paddingLeft: '0px', fontSize: "14px" }}>Orientation</div>
                                </td>
                                <td>
                                    <div style={{ width: "90%", paddingLeft: "0px" }}>
                                        <DropDownListComponent width={'110%'} id="orientationMode" style={{ "width": "100%" }} change={orienatationChange} className="form-control" ref={orientationElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="Vertical"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px', paddingTop: '15px' }}>
                                <td>
                                    <div style={{ marginTop: "-20px", paddingLeft: '0px', fontSize: "14px" }}>Container Type</div>
                                </td>
                                <td>
                                    <div style={{ paddingBottom: '20px', width: '90%', paddingLeft: "0px" }}>
                                        <DropDownListComponent width={'110%'} id="containerMode" style={{ "width": "90%" }} change={containerChange} className="form-control" ref={containerElement} dataSource={modelist} fields={{ text: 'text', value: 'value' }} value="Thermometer"/>
                                    </div>
                                </td>
                            </tr>
                           </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
        </div>
            <section id="action-description" aria-label="Description of Linear Gauge sample">
                <p>This sample shows the different types of containers, such as normal, thermometer, and rounded rectangle. The linear gauge's orientation can also be changed from vertical to horizontal.</p>
            </section>
            <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                <p>
                    The linear gauge can be rendered vertically or horizontally depending on the option selected in the <b>Orientation</b> drop-down list. You can also select the container type from the <b>Container Type</b> drop-down list.
                </p>
                <p>
                    More information on the containers can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/appearance/#customizing-the-linear-gauge-container">documentation section</a>. Likewise, information about orientation can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#orientation">documentation section</a>.
                </p>
            </section>
    </main>);
};
export default Container;
