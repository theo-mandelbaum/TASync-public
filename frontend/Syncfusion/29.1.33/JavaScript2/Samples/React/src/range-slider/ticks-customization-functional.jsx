import * as React from 'react';
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import './ticks-customization.css';
const TicksCustomization = () => {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let ticks = { placement: 'Before', largeStep: 20 };
    let ticksData = { placement: 'Both', largeStep: 20, smallStep: 5 };
    let li;
    const renderingTicks = (args) => {
        if (args.tickElement.classList.contains('e-large')) {
            args.tickElement.classList.add('e-custom');
        }
    };
    const onrenderedSliderTicks = (args) => {
        li = args.ticksWrapper.getElementsByClassName('e-large');
        let remarks = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (let i = 0; i < li.length; ++i) {
            li[i].querySelectorAll('.e-tick-both')[1].innerText = remarks[i];
        }
    };
    return (<div className='control-pane'>
            <div className='control-section'>
                <div className="slider-content-wrapper">
                    <div className="slider_container">
                        <div className="slider_container" id="slider_wrapper">
                            <div className="slider_labelText userselect">Dynamic ticks color</div>
                            {/* Ticks slider element  */}
                            <SliderComponent id={"ticks_slider"} value={20} min={0} max={100} step={5} ticks={ticks} type="MinRange" renderingTicks={renderingTicks.bind(this)}/>
                        </div>
                        <div className="slider_container">
                            <div className="slider_labelText userselect">Ticks with legends</div>
                            {/* Ticks slider element */}
                            <SliderComponent id={"slider"} value={20} min={0} max={100} type="MinRange" ticks={ticksData} renderedTicks={onrenderedSliderTicks.bind(this)}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the customization of Slider's Tick. Drag the thumb over the bar for selecting the values between
                    min and max.
                </p>
            </div>
            <div id="description">
                <p>In this demo, we have demonstrated the following customization of Ticks using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#cssclass">CSS</a>.</p>
                <ul>
                    <li>Dynamic ticks color - In this sample, Ticks has been customized to different colors by adding icon at each Ticks.</li>
                    <li>Ticks with legends - In this sample, Track has been formatted to display custom text using renderingTicks and renderedTicks events. </li>
                </ul>
            </div>
        </div>);
};
export default TicksCustomization;
