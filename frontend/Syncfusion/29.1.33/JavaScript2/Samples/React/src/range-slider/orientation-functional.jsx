import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
const slidercss = `
.content-wrapper {
    width: 80%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    height: 375px;
    margin-top: 10px;
    width: 60%;
    margin: auto;
}

.e-bigger .content-wrapper {
    width: 80%;
}

.sliderwrap .e-lbl {
    display: block;
    font-size: 11px;
    font-weight: 500;
    margin-top: 15px;
    margin-left: -10px;
}

.sliderwrap:last-child .e-lbl {
    margin-left: -2px;
}

.slider_table td {
    text-align: center;
}

.slider_table {
    border: 0;
    width: 100%
}
`;
const Orientation = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [tooltip, setTooltip] = useState({
        isVisible: true,
        placement: 'Before'
    });
    const [ticks, setTicks] = useState({
        placement: 'Before',
        largeStep: 20,
        smallStep: 5,
        showSmallTicks: true
    });
    //Instance of the components
    let defaultObj = useRef(null);
    let rangeObj = useRef(null);
    let minRangeObj = useRef(null);
    let reverseObj = useRef(null);
    // Checkbox change handlers
    const enableDisableTicks = (args) => {
        setTicks({ ...ticks, placement: args.checked ? 'Before' : 'None' });
    };
    const enableDisableTooltip = (args) => {
        setTooltip({ ...tooltip, isVisible: args.checked });
    };
    const refreshTooltip = (e) => {
        if (rangeObj.current && defaultObj.current && minRangeObj.current && reverseObj.current) {
            defaultObj.current.refreshTooltip(defaultObj.tooltipTarget);
            minRangeObj.current.refreshTooltip(minRangeObj.tooltipTarget);
            rangeObj.current.refreshTooltip(rangeObj.tooltipTarget);
            reverseObj.current.refreshTooltip(reverseObj.tooltipTarget);
        }
    };
    if (!isNullOrUndefined(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(this));
    }
    return (<div className='control-pane' style={{ overflow: 'hidden' }}>
            <style>{slidercss}</style>
            <div className='control-section'>
                <div className='col-lg-8'>
                    <div className="content-wrapper">
                        <table className="slider_table">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="sliderwrap">
                                            {/* Initialize Slider component with Vertical orientation */}
                                            <SliderComponent id={"slider01"} value={30} orientation='Vertical' ticks={ticks} tooltip={tooltip} ref={defaultObj}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="sliderwrap">
                                            {/* Initialize  Slider component with type MinRange and Vertical orientation */}
                                            <SliderComponent id={"slider02"} value={30} type='MinRange' orientation='Vertical' ticks={ticks} tooltip={tooltip} ref={minRangeObj}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="sliderwrap">
                                            {/* Initialize Range Slider component with type Range and Vertical orientation */}
                                            <SliderComponent id={"slider03"} value={[30, 70]} type='Range' orientation='Vertical' ticks={ticks} tooltip={tooltip} ref={rangeObj}/>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="sliderwrap">
                                            {/* Initialize Range Slider component with type Range and Vertical orientation */}
                                            <SliderComponent id={"slider04"} value={[30, 70]} min={100} max={0} type='Range' orientation='Vertical' ticks={ticks} tooltip={tooltip} ref={reverseObj}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div id="slider_event" className="col-lg-4 property-section">
                    <PropertyPane title='Properties'>
                        <table id="property" title="Properties" className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%', paddingTop: '10px' }}>
                                        <div className="userselect">Ticks</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '10px' }}>
                                        <div>
                                            {/* Initialize Range CheckBox component */}
                                            <CheckBoxComponent checked={true} change={enableDisableTicks.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td style={{ width: '50%', paddingTop: '10px' }}>
                                        <div className="userselect">Tooltip</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '10px' }}>
                                        <div style={{ paddingLeft: 0, paddingTop: 0 }}>
                                            {/* Initialize Range CheckBox component */}
                                            <CheckBoxComponent checked={true} change={enableDisableTooltip.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the rendering of Slider component in Vertical orientation. Drag the thumb over the bar for selecting the values between min and max.</p>
            </div>
            <div id="description">
                <p>The Slider component can be rendered in either horizontal or vertical orientation and this can be set through the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#orientation">orientation</a> property</p>
                <p>The Slider component allows the user to select a value or range of values in-between a min and max range, by dragging the thumb over the slider bar in Vertical orientation. There are three types of sliders available in Vertical Orientation:</p>
                <ul>
                    <li>Default - allows us to select a single value in Vertical Orientation</li>
                    <li>MinRange – allows us to select a single value, but highlights with a range selection from the min value to the current handle value in Vertical Orientation</li>
                    <li>Range – allows us to select a range of values with two handles, where the handles was connected with a range selection in Vertical Orientation</li>
                    <li>Reverse – allows to render the component in reverse order. To utilise this, set the maximum value to the Min
            property and set the minimum value to the Max property</li>
                </ul>
                <p>The dragInterval is used to drag both handles using the range bar which is also applicable only to the range slider.</p>
                <p>In this demo we can see the Default, MinRange and Range slider types.</p>
                <p>
                    For more information, we can refer the
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/range-slider/getting-started/#orientation">Orientation</a> section from the documentation.
                </p>
            </div>
        </div>);
};
export default Orientation;
