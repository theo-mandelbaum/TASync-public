import * as React from 'react';
import { useRef } from "react";
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
const slidercss = `
.sliderwrap .label-text {
    font-weight: 500;
}

.content-wrapper {
    width: 80%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 40px;
}

#slider01 .e-handle,
#out .e-handle,
.bootstrap #out .e-handle,
.bootstrap #slider01 .e-handle,
.fabric #out .e-handle,
.fabric #slider01 .e-handle,
.highcontrast #out .e-handle,
.highcontrast #slider01 .e-handle {
    background-color: #ffd939;
    border-color: #ffd939;
    z-index: 1;
}

.e-bigger .content-wrapper {
    width: 80%;
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

.e-slider-tooltip.e-tooltip-wrap.e-popup.e-slider-tooltip .e-tip-content,
.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-range .e-tip-content.e-material-tooltip-show {
    color: #333;
}

.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-inner{
    color: #ffd939;
}

.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-outer {
    border-top-color: #ffd939;
}

.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-outer {
    border-bottom-color: #ffd939;
}

.e-slider-container .e-slider#slider01 .e-range,
.e-slider-container .e-slider#out .e-range {
    background-color: #0375be;
    z-index: unset;
}
.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-default.e-slider-horizontal-after,
.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-default.e-slider-horizontal-before,
.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup {
    background-color: #ffd939;
    border-color: #ffd939;
}

.bootstrap .e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-outer {
    border-top-color: #ffd939;
}

.bootstrap .e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-inner {
    color: #ffd939;
}

body.fluent2-highcontrast .sliderwrap .e-scale,
body.fluent2 .sliderwrap .e-scale,
body.fluent2-dark .sliderwrap .e-scale {
    top: 2px;
}

body.tailwind3 .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,
body.tailwind3-dark .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,
body.tailwind3.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick
body.tailwind3-dark.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick {
    top: 0px;
}
`;
const TooltipCustomization = () => {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    // Set slider minimum and maximum values
    // new Date(Year, Month, day, hours, minutes, seconds, millseconds)
    let min = new Date(2013, 6, 13, 11).getTime();
    let sliderMin = new Date(2013, 6, 13, 11).getTime();
    let sliderMax = new Date(2013, 6, 13, 23).getTime();
    let max = new Date(2013, 6, 13, 23).getTime();
    // Initialize ticks with placement, largestep, smallste
    let value = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
    let ticks = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    // Initialize tooltip with placement
    let tooltip = {
        placement: 'Before', isVisible: true, cssClass: 'e-tooltip-cutomization'
    };
    let sliderTooltip = {
        placement: 'Before', isVisible: true, cssClass: 'e-tooltip-cutomization'
    };
    let timeObj = useRef(null);
    let sliderObj = useRef(null);
    const tooltipChangeHandler = (args) => {
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom = { hour: '2-digit', minute: '2-digit' };
        // Splitting the range values from the tooltip using space into an array.
        if (args.text.indexOf('-') !== -1) {
            let totalMiliSeconds = args.text.split(' ');
            // First part is the first handle value
            let firstPart = totalMiliSeconds[0];
            // Second part is the second handle value
            let secondPart = totalMiliSeconds[2];
            firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
            secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
            // Assigning our custom text to the tooltip value.
            args.text = firstPart + ' - ' + secondPart;
        }
        else {
            args.text = 'Until ' + new Date(Number(args.text)).toLocaleTimeString('en-us', custom);
        }
    };
    let sliderTicks = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    const onRenderingTicks = (args) => {
        let totalMiliSeconds = Number(args.value);
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom = { hour: '2-digit', minute: '2-digit' };
        // Assigning our custom text to the tick value.
        args.text = new Date(totalMiliSeconds).toLocaleTimeString('en-us', custom);
    };
    // Handler used to reposition the tooltip on page scroll
    const onScroll = () => {
        if (sliderObj.current && timeObj.current) {
            timeObj.current.refreshTooltip(timeObj.tooltipTarget);
            sliderObj.current.refreshTooltip(sliderObj.tooltipTarget);
        }
    };
    if (!isNullOrUndefined(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll.bind(this));
    }
    return (<div className='control-pane'>
            <style>{slidercss}</style>
            <div className='col-lg-12-control-section'>
                <div className="content-wrapper">
                    <div className="sliderwrap">
                        <label className="labeltext userselect">
                            <span className="label-text">Background color</span>
                        </label>
                        <SliderComponent id="slider01" value={value} min={min} max={max} step={3600000 / 6} ticks={ticks} type="Range" tooltip={tooltip} tooltipChange={tooltipChangeHandler.bind(this)} ref={timeObj} renderingTicks={onRenderingTicks.bind(this)}/>
                    </div>
                    <div className="sliderwrap">
                        <label className="labeltext userselect">
                            <span className="label-text">Color and text</span>
                        </label>
                        {/* Ticks slider element - */}
                        <SliderComponent id="out" value={new Date(2013, 6, 13, 17).getTime()} min={sliderMin} max={sliderMax} step={3600000 / 6} ticks={sliderTicks} type="MinRange" tooltip={sliderTooltip} tooltipChange={tooltipChangeHandler.bind(this)} ref={sliderObj} renderingTicks={onRenderingTicks.bind(this)}/>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the customization of Slider's Tooltip. Drag the thumb over the bar for selecting the values between min and max.</p>
            </div>
            <div id="description">
                <p>In this demo, we have demonstrated the following customization of Tooltip using <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/slider/#cssclass">CSS</a>.</p>
                <ul>
                    <li>Background color - In this sample, Tooltip has been customized to custom color.</li>
                    <li>Color and text - In this sample, Tooltip and its content has been customized to custom color.</li>
                </ul>
            </div>
        </div>);
};
export default TooltipCustomization;
