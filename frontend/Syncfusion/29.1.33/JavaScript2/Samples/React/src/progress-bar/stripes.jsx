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
    margin-top: 2%;
}
.linear-button {
    text-align: center;
}
.linear-progress {
    width: 80%;
    margin: auto;
    margin-bottom: 3%;
}
#reLoad {
    border-radius: 4px;
    text-transform: capitalize;
}
    `;
/**
 * Area sample
 */
export class ProgressBarStripes extends SampleBase {
    linearOne;
    linearTwo;
    linearThree;
    linearFour;
    animationBtn;
    progressThickness = 20;
    trackThickness = 20;
    progressLoad = (args) => {
        let theme = loadProgressBarTheme(args);
        if (theme === 'Material') {
            args.progressBar.trackColor = '#eee';
        }
        if (theme === 'HighContrast') {
            args.progressBar.trackColor = '#969696';
        }
    };
    replayClick() {
        if (!this.linearOne.animation.enable) {
            this.linearOne.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearOne.refresh();
        }
        else {
            this.linearOne.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearOne.refresh();
        }
        if (!this.linearTwo.animation.enable) {
            this.linearTwo.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearTwo.refresh();
        }
        else {
            this.linearTwo.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearTwo.refresh();
        }
        if (!this.linearThree.animation.enable) {
            this.linearThree.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearThree.refresh();
        }
        else {
            this.linearThree.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearThree.refresh();
        }
        if (!this.linearFour.animation.enable) {
            this.linearFour.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearFour.refresh();
        }
        else {
            this.linearFour.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearFour.refresh();
        }
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div className="row linear-parent">
                        <div id="success" className="linear-progress">
                            <ProgressBarComponent id="progress-success" ref={linear1 => this.linearOne = linear1} type='Linear' height='30' width='100%' value={20} progressThickness={this.progressThickness} trackThickness={this.trackThickness} role="Success" isStriped={true} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                        <div id="info" className="linear-progress">
                            <ProgressBarComponent id="progress-info" ref={linear2 => this.linearTwo = linear2} type='Linear' height='30' width='100%' value={40} progressThickness={this.progressThickness} trackThickness={this.trackThickness} isStriped={true} role='Info' animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                        <div id="warning" className="linear-progress">
                            <ProgressBarComponent id="progress-warning" ref={linear3 => this.linearThree = linear3} type='Linear' height='30' width='100%' value={70} progressThickness={this.progressThickness} trackThickness={this.trackThickness} isStriped={true} role='Warning' animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                        <div id="danger" className="linear-progress">
                            <ProgressBarComponent id="progress-danger" ref={linear4 => this.linearFour = linear4} type='Linear' height='30' width='100%' value={100} progressThickness={this.progressThickness} trackThickness={this.trackThickness} isStriped={true} role='Danger' animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div style={{ marginTop: '2%', marginLeft: '45.5%' }}><button ref={btn => this.animationBtn = btn} onClick={this.replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Stop Animation</button></div>
                </div>
                <div id="action-description">
                    <p>
                        This sample illustrates a striped linear progress bar with animation.
                </p>
                </div>
                <div id="description">
                    <p>This demo for Progress Bar control shows the linear striped progress bar  with help of <code>isStriped</code>property.</p>
                </div>
            </div>);
    }
}
