import * as React from "react";
import { ProgressBarComponent } from '@syncfusion/ej2-react-progressbar';
import { SampleBase } from '../common/sample-base';
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

    .progressbar-label {
        text-align: left;
        font-family: Roboto-Regular;
        font-size: 14px;
        color: #3D3E3C;
        margin-left: 10px;
        padding: 0px;
        top: 10px;
    }

    #reLoad {
        border-radius: 4px;
        text-transform: capitalize;
    }
    `;
/**
 * Area sample
 */
export class ProgressBarLinear extends SampleBase {
    linearOne;
    linearTwo;
    linearThree;
    linearFour;
    linearFive;
    progressLoad = (args) => {
        let div = document.getElementsByClassName('progressbar-label');
        let theme = loadProgressBarTheme(args);
        if (theme === 'HighContrast' || theme === 'Bootstrap5Dark' || theme === 'BootstrapDark' || theme === 'FabricDark'
            || theme === 'TailwindDark' || theme === 'Tailwind3Dark' || theme === 'MaterialDark' || theme === 'FluentDark' || theme === 'Material3Dark') {
            for (let i = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
    };
    replayClick() {
        this.linearOne.refresh();
        this.linearTwo.refresh();
        this.linearThree.refresh();
        this.linearFour.refresh();
        this.linearFive.refresh();
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row linear-parent" style={{ marginLeft: '10%' }}>
                        <div className="col-lg-12 col-md-12" style={{ marginTop: '1%' }}>
                            <div className="col-lg-12 col-md-12 progressbar-label">Determinate</div>
                            <div className="linear-progress">
                                <ProgressBarComponent id="lineardeterminate" ref={linear1 => this.linearOne = linear1} type='Linear' height='60' value={100} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                            <div className="col-lg-12 col-md-12 progressbar-label">Indeterminate</div>
                            <div className="linear-progress">
                                <ProgressBarComponent id="linearindeterminate" ref={linear2 => this.linearTwo = linear2} type='Linear' height='60' value={20} isIndeterminate={true} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                            <div className="col-lg-12 col-md-12 progressbar-label">Segment</div>
                            <div className="linear-progress">
                                <ProgressBarComponent id="linearsegment" ref={linear3 => this.linearThree = linear3} type='Linear' height='60' value={100} segmentCount={8} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                            <div className="col-lg-12 col-md-12 progressbar-label">Buffer</div>
                            <div className="linear-progress">
                                <ProgressBarComponent id="linearbuffer" ref={linear4 => this.linearFour = linear4} type='Linear' height='60' value={40} secondaryProgress={60} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-12 col-md-12" style={{ marginTop: '2.5%' }}>
                            <div className="col-lg-12 col-md-12 progressbar-label">Active</div>
                            <div className="linear-progress">
                                <ProgressBarComponent id="linearactive" ref={linear5 => this.linearFive = linear5} type='Linear' height='60' value={100} isActive={true} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                                </ProgressBarComponent>
                            </div>
                        </div>
                    </div>
                    <div id="replay-progressbar" style={{ marginTop: '2%', marginLeft: '45.5%' }}><button onClick={this.replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button></div>
                </div>
                <div id="action-description">
                    <p>
                    This sample illustrates a linear progress bar with determinate and indeterminate states, segments and buffer value.
                </p>
                </div>
                <div id="description">
                    <p>The sample shows the determinate and indeterminate states, buffer and segments of linear progress bar.</p>
                </div>
            </div>);
    }
}
