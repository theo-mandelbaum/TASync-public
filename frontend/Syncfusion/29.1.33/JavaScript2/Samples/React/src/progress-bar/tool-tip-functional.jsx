import * as React from "react";
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
import { updateSampleSection } from '../common/sample-base';
import { loadProgressBarTheme } from './theme-colors';
const SAMPLE_CSS = `
      #control-container {
         padding: 0px !important;
     }
 
     .linear-parent {
         text-align: center;
         width: 80%;
         margin: auto !important;
     }
 
     .progressbar-label-tooltip {
         text-align: left;
         font-family: Roboto-Regular;
         font-size: 14px;
         color: #3D3E3C;
         margin-left: 10px;
         padding: 0px;
         top: 10px;
     }

     `;
/**
 * Area sample
 */
function ProgressBarLinearTooltip() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let linearOne;
    let linearTwo;
    let linearThree;
    let linearFour;
    let linearFive;
    let progressLoad = (args) => {
        let div = document.getElementsByClassName('progressbar-label-tooltip');
        let selectedTheme = loadProgressBarTheme(args);
        if (selectedTheme === 'HighContrast' || selectedTheme === 'Bootstrap5Dark' || selectedTheme === 'BootstrapDark' || selectedTheme === 'FabricDark'
            || selectedTheme === 'TailwindDark' || selectedTheme === 'Tailwind3Dark' || selectedTheme === 'MaterialDark' || selectedTheme === 'FluentDark' || selectedTheme === 'Material3Dark' || selectedTheme === 'Fluent2Dark' || selectedTheme === 'Fluent2HighContrast') {
            for (let i = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
    };
    return (<div className='control-pane'>
        <style>
            {SAMPLE_CSS}
        </style>
        <div className='control-section'>
            <div className="row linear-parent" style={{ marginLeft: '10%' }}>
                <div style={{ marginTop: '0.5%' }}>
                    <div className="progressbar-label-tooltip">HTML5</div>
                    <div className="linear-progress">
                        <ProgressBarComponent id="lineardeterminate" ref={linear1 => linearOne = linear1} type='Linear' height='60' value={75} trackThickness={20} progressThickness={20} animation={{
            enable: true,
            duration: 2000,
            delay: 0,
        }} tooltip={{
            enable: true
        }} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                </div>
                <div style={{ marginTop: '0.5%' }}>
                    <div className="progressbar-label-tooltip">CSS3</div>
                    <div className="linear-progress">
                        <ProgressBarComponent id="linearindeterminate" ref={linear2 => linearTwo = linear2} type='Linear' height='60' value={65} trackThickness={20} progressThickness={20} animation={{
            enable: true,
            duration: 2000,
            delay: 0,
        }} tooltip={{
            enable: true
        }} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                </div>
                <div style={{ marginTop: '0.5%' }}>
                    <div className="progressbar-label-tooltip">Bootstrap</div>
                    <div className="linear-progress">
                        <ProgressBarComponent id="linearsegment" ref={linear3 => linearThree = linear3} type='Linear' height='60' value={55} trackThickness={20} progressThickness={20} animation={{
            enable: true,
            duration: 2000,
            delay: 0,
        }} tooltip={{
            enable: true
        }} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                </div>
                <div style={{ marginTop: '0.5%' }}>
                    <div className="progressbar-label-tooltip">JavaScript</div>
                    <div className="linear-progress">
                        <ProgressBarComponent id="linearbuffer" ref={linear4 => linearFour = linear4} type='Linear' height='60' value={75} trackThickness={20} progressThickness={20} animation={{
            enable: true,
            duration: 2000,
            delay: 0,
        }} tooltip={{
            enable: true
        }} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                </div>
                <div style={{ marginTop: '0.5%' }}>
                    <div className="progressbar-label-tooltip">MySQL</div>
                    <div className="linear-progress">
                        <ProgressBarComponent id="linearactive" ref={linear5 => linearFive = linear5} type='Linear' height='60' value={75} trackThickness={20} progressThickness={20} animation={{
            enable: true,
            duration: 2000,
            delay: 0,
        }} tooltip={{
            enable: true
        }} load={progressLoad.bind(this)}>
                        </ProgressBarComponent>
                    </div>
                </div>
            </div>
        </div>
        <div id="action-description">
        <p>This sample illustrates a linear progress bar with a tooltip.</p>
        </div>
        <div id="description">
        <p>In this example, you can see how to render and configure the linear progress bar with a tooltip. The <code>format</code> and <code>textStyle</code> properties in the tooltip settings can be used to format and customize the tooltip text.</p>
        </div>
    </div>);
}
export default ProgressBarLinearTooltip;
