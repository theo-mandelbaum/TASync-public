import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
const slidercss = `
.material #property tr#showon {
    display: none;
}

.content-wrapper {
    width: 52%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap label {
    padding-bottom: 26px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
}

.userselect {
    -webkit-user-select: none;
    /* Safari 3.1+ */
    -moz-user-select: none;
    /* Firefox 2+ */
    -ms-user-select: none;
    /* IE 10+ */
    user-select: none;
    /* Standard syntax */
}
`;
const Tooltip = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [tooltip, setTooltip] = useState({
        placement: 'Before',
        isVisible: true,
        showOn: 'Focus'
    });
    //Instance of the component
    let defaultObj = useRef(null);
    let rangeObj = useRef(null);
    //Dropdownlist datasource values for changing tooltip placement for slider component
    let option = [{ text: 'Focus', value: 'Focus' }, { text: 'Hover', value: 'Hover' }, { text: 'Auto', value: 'Auto' },
        { text: 'Always', value: 'Always' }];
    let fields = { value: 'value', text: 'text' };
    let placement = [{ text: 'Before', value: 'Before' }, { text: 'After', value: 'After' }];
    let placementField = { value: 'value', text: 'text' };
    // Handling the dropdown list change event to change slider tooltip showOn property
    const onChange = (args) => {
        setTooltip({ ...tooltip, showOn: args.value });
    };
    // Handling the dropdown list change event to change slider tooltip placement
    const onPlacementChange = (args) => {
        setTooltip({ ...tooltip, placement: args.value });
    };
    // Handler used to reposition the tooltip on page scroll
    const onScroll = () => {
        if (rangeObj.current && defaultObj.current) {
            defaultObj.current.refreshTooltip(defaultObj.tooltipTarget);
            rangeObj.current.refreshTooltip(rangeObj.tooltipTarget);
        }
    };
    if (!isNullOrUndefined(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll.bind(this));
    }
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className='col-lg-8'>
                    <div className="content-wrapper">
                        <style>{slidercss}</style>
                        <div className='sliderwrap'>
                            <label>Default Slider</label>
                            {/* Initialize Slider Component */}
                            <SliderComponent id="slider01" value={30} showButtons={true} tooltip={tooltip} ref={defaultObj}/>
                        </div>
                        <div className='sliderwrap'>
                            <label>Range Slider</label>
                            {/* Initialize Slider Component with type Range */}
                            <SliderComponent id="slider02" value={[30, 70]} showButtons={true} type='Range' tooltip={tooltip} ref={rangeObj}/>
                        </div>
                    </div>
                </div>
                <div id="#slider_event" className='col-lg-4 property-section'>
                    <PropertyPane title='Tooltip'>
                        <table id="property" title="Tooltip" className='property-panel-table' style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td style={{ width: '50%' }}>
                                        <div>Placement</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '10px' }}>
                                        <div>
                                            {/* Initialize DropDownList Component */}
                                            <DropDownListComponent dataSource={placement} fields={placementField} index={0} placeholder="Select a Placement" popupHeight="200px" change={onPlacementChange.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                                <tr id="showon">
                                    <td style={{ width: '50%' }}>
                                        <div>ShowOn</div>
                                    </td>
                                    <td style={{ width: '50%', paddingRight: '10px' }}>
                                        <div>
                                            {/* Initialize DropDownList Component */}
                                            <DropDownListComponent dataSource={option} fields={fields} index={0} placeholder="Select a ShowOn" popupHeight="200px" change={onChange.bind(this)}/>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the rendering of Slider component with Ticks placement. Drag the thumb over the bar for selecting
                   the values between min and max.
                </p>
            </div>
            <div id="description">
                <p>The Ticks are the visual representation of the Slider values. The ticks are differentiated as small ticks and large ticks
                    based on its size. The ticks position can be defined by the
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/ticksData/#smallstep"> smallStep</a> and
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/ticksData/#largestep">largeStep</a> properties.
                </p>
                <p> In this demo, we have demonstrated Ticks position with Default and Range Slider.</p>
                <ul>
                    <li>Default Slider – In this sample, the small ticks and large ticks are rendered with the frequency of 0.05 and 0.20.</li>
                    <li>Range Slider – In this sample, the small ticks and large ticks are rendered with the frequency of 5 and 20.</li>
                </ul>
                <p> We can also change the Ticks placement of  Slider and Disable Slider component from the property pane.</p>
                <p>We can use the below property to restrict the value range for the slider:</p>
                <ul>
                    <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#step">step </a> - to define incremental/decremental step value for slider</li>
                    <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#min">min </a> – to specify minimum value of the slider</li>
                    <li><a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#max">max </a> – to specify maximum value of the slider</li>
                </ul>
                <p>The dragInterval is used to drag both handles using the range bar which is also applicable only to the range slider.</p>
                <p>For more information, we can refer the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/range-slider/ticks/">ticks</a> section from the documentation.</p>
            </div>
        </div>);
};
export default Tooltip;
