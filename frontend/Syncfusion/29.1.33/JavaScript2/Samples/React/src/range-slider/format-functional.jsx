import * as React from 'react';
import { useRef, useEffect } from "react";
import { SliderComponent } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
const slidercss = `
.content-wrapper {
    width: 40%;
    margin: 0 auto;
    min-width: 185px;
}

.sliderwrap {
    margin-top: 40px;
}
.e-bigger .content-wrapper {
    width: 80%;
}
.sliderwrap label {
    padding-bottom: 26px;
    font-size: 13px;
    font-weight: 500;
    margin-top: 15px;
    text-align: left;
    width: 100%;
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
const Format = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    let currencyObj = useRef(null);
    let kilometerObj = useRef(null);
    let timeObj = useRef(null);
    let currencyTicks = {
        placement: 'After', largeStep: 25, smallStep: 5, showSmallTicks: true,
        // Formatting ticks value in currency with 3-decimal specifier.
        format: 'c1'
    };
    let currencyTooltip = {
        placement: 'Before', isVisible: true,
        // Formatting tooltip value in currency with 2-decimal specifier.
        format: 'c2'
    };
    let kilometerTicks = {
        placement: 'After',
        largeStep: 400,
        smallStep: 200,
        showSmallTicks: true,
        /**
         * Formatting ticks value in numeric with 2-decimal specifier if the any decimal values occurred.
         * Zeros will be filled if the values are not in 4-digits in the fractional part.
         */
        format: '00##.## km'
    };
    let kilometerTooltip = {
        placement: 'Before',
        isVisible: true,
        /**
         * Formatting tooltip value in numeric with 2-decimal specifier if the any decimal values occurred.
         * Zeros will be filled if the values are not in 4-digits in the fractional part.
         */
        format: '00##.## km'
    };
    let minValue = new Date(2013, 6, 13, 11).getTime();
    let maxValue = new Date(2013, 6, 13, 23).getTime();
    // 3600000 milliseconds = 1 Hour, 3600000 / 6 milliseconds = 10 Minutes
    let stepValue = 3600000 / 6;
    let value = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
    let timeTooltip = {
        placement: 'Before', isVisible: true
    };
    let timeTicks = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    const tooltipChangeHandler = (args) => {
        // Splitting the range values from the tooltip using space into an array.
        let totalMiliSeconds = args.text.split(' ');
        // First part is the first handle value
        let firstPart = totalMiliSeconds[0];
        // Second part is the second handle value
        let secondPart = totalMiliSeconds[2];
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        let custom = { hour: '2-digit', minute: '2-digit' };
        firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
        secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
        // Assigning our custom text to the tooltip value.
        args.text = firstPart + ' - ' + secondPart;
    };
    const renderingTicksHandler = (args) => {
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
        if (currencyObj.current && kilometerObj.current && timeObj.current) {
            for (let slider of [currencyObj, kilometerObj, timeObj]) {
                slider.current.refreshTooltip(slider.tooltipTarget);
            }
        }
    };
    if (!isNullOrUndefined(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll.bind(this));
    }
    return (<div>
            <div className="col-lg-12 control-section">
                <div className="content-wrapper">
                    <style>{slidercss}</style>
                    <div className='sliderwrap'>
                        <label>Currency Slider</label>
                        {/* Initialize Slider Component with type Range */}
                        <SliderComponent id="slider01" value={[20, 80]} min={0} max={100} ticks={currencyTicks} tooltip={currencyTooltip} type='Range' ref={currencyObj}/>
                    </div>
                    <div className='sliderwrap'>
                        <label>Kilometer Slider</label>
                        {/* Initialize Slider Component with type Range */}
                        <SliderComponent id="slider02" value={[1100, 1850]} min={900} max={2100} ticks={kilometerTicks} type='Range' tooltip={kilometerTooltip} ref={kilometerObj}/>
                    </div>
                    <div className='sliderwrap'>
                        <label>Time Slider</label>
                        {/* Initialize Slider Component with type Range */}
                        <SliderComponent id="slider03" value={value} min={minValue} max={maxValue} ticks={timeTicks} type='Range' step={stepValue} tooltip={timeTooltip} tooltipChange={tooltipChangeHandler.bind(this)} renderingTicks={renderingTicksHandler.bind(this)} ref={timeObj}/>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample demonstrates the formatting of Ticks and Tooltip of Slider. Drag the thumb over the bar for selecting the
                    formatted values between min and max.
                </p>
            </div>
            <div id="description">
                <p>
                    The format feature used to customize the units of Slider values to desired format. The formatted values will also be
                    applied to the ARIA attributes of the slider
                </p>
                <p>In this demo, we have demonstrated Slider with Currency, Kilometer and Time formatting.</p>
                <ul>
                    <li>Currency Slider – In this sample, Ticks and Tooltip are formatted to currency using format API in both tooltip and ticks.</li>
                    <li>Kilometer Slider – In this sample, Ticks and Tooltip are formatted to Kilometer using format API in both tooltip and ticks.</li>
                    <li>Time Slider – In this sample, Ticks and Tooltip are formatted to Time using change event in Tooltip and renderingTicksnevent in Ticks</li>
                </ul>
                <p>
                    For more information, we can refer the
                    <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/range-slider/format/">Format</a> section from the documentation.
                </p>
            </div>
        </div>);
};
export default Format;
