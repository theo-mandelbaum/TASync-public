import * as React from "react";
import { ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject, ProgressAnnotation } from '@syncfusion/ej2-react-progressbar';
import { SampleBase } from '../common/sample-base';
import { loadProgressBarTheme } from './theme-colors';
const SAMPLE_CSS = `
        .control-fluid {
		padding: 0px !important;
        }
   #control-container {
        padding: 0px !important;
    }

    #reLoad {
        border-radius: 4px;
        text-transform: capitalize;
        margin-top: 3%;
    }

    .reload-btn {
        text-align: center;
    }
    #reLoad {
        border-radius: 4px;
        text-transform: capitalize;
        margin-top: 3%;
    }
    `;
export class ProgressBarRadius extends SampleBase {
    fullBackground;
    outerRadius;
    onRadius;
    pie;
    replayClick() {
        this.fullBackground.refresh();
        this.outerRadius.refresh();
        this.onRadius.refresh();
        this.pie.refresh();
    }
    content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#ffffff;fill:#ffffff"><span>60%</span></div>';
    progressLoad = (args) => {
        let theme = loadProgressBarTheme(args);
        if (args.progressBar.element.id === 'full-background') {
            switch (theme) {
                case 'Material':
                    args.progressBar.trackColor = '#f8c2d4';
                    args.progressBar.progressColor = '#e91e63';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'Fabric':
                    args.progressBar.progressColor = '#0078D6';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'Bootstrap':
                    args.progressBar.progressColor = '#317ab9';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'Tailwind':
                case 'Tailwind3':
                    args.progressBar.progressColor = '#4F46E5';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;
                case 'HighContrast':
                    args.progressBar.progressColor = '#FFD939';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#FFD939;"><span>60%</span></div>';
                    break;
                case 'BootstrapDark':
                case 'Fabricdark':
                case 'MaterialDark':
                    args.progressBar.progressColor = '#9A9A9A';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                    break;
                case 'TailwindDark':
                    args.progressBar.progressColor = '#22D3EE';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                    break;
                case 'Tailwind3Dark':
                    args.progressBar.progressColor = '#6366F1';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                    break;
                case 'Bootstrap4':
                    args.progressBar.progressColor = '#007bff';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                case 'Bootstrap5':
                case 'Bootstrap5Dark':
                case 'Fluent':
                case 'FluentDark':
                    args.progressBar.progressColor = '#0D6EFD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                    break;
                case 'Material3':
                    args.progressBar.progressColor = '#6750A4';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                    break;
                case 'Material3Dark':
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
                case 'Fluent2':
                    args.progressBar.progressColor = '#0F6CBD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                    break;
                case 'Fluent2HighContrast':
                    args.progressBar.progressColor = '#1AEBFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                    break;
                case 'Fluent2Dark':
                    args.progressBar.progressColor = '#115EA3';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                    break;
                default:
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
            }
        }
    };
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section">
                    <div className="row" style={{ marginTop: '8%', marginLeft: '8%' }}>
                        <div className="col-lg-3 col-md-3 col-sm-3" style={{ alignContent: 'center' }}>
                            <ProgressBarComponent id="full-background" ref={progress1 => this.fullBackground = progress1} type='Circular' width='160px' height='160px' cornerRadius='Round' enableRtl={false} radius='100%' innerRadius='190%' progressThickness={10} trackThickness={80} value={60} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                                <Inject services={[ProgressAnnotation]}/>
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={this.content}>
                                    </ProgressBarAnnotationDirective>
                                </ProgressBarAnnotationsDirective>

                            </ProgressBarComponent>
                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3" style={{ alignContent: 'center' }}>
                            <ProgressBarComponent id="outer-radius" ref={progress2 => this.outerRadius = progress2} type='Circular' width='160px' height='160px' value={90} innerRadius='72' progressThickness={8} cornerRadius='Round' animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                            </ProgressBarComponent>

                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3" style={{ alignContent: 'center' }}>
                            <ProgressBarComponent id="on-radius" ref={progress3 => this.onRadius = progress3} type='Circular' width='160px' height='160px' value={90} trackThickness={3} progressThickness={8} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                            </ProgressBarComponent>

                        </div>
                        <div className="col-lg-3 col-md-3 col-sm-3" style={{ alignContent: 'center' }}>
                            <ProgressBarComponent id="pie" ref={progress4 => this.pie = progress4} type='Circular' width='160px' height='160px' value={70} enablePieProgress={true} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                            </ProgressBarComponent>

                        </div>
                    </div>
                    <div id="replay-progressbar" style={{ marginTop: '2%', marginLeft: '45.5%' }}><button onClick={this.replayClick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button></div>
                </div>
                <div id="action-description">
                    <p>
                       This sample illustrates a circular progress bar with customization options like radius, inner-radius, pie progress, track and progress thickness.
                </p>
                </div>
                <div id="description">
                    <p>
                       This demo for Essential<sup>®</sup> JS2 Progress Bar control shows the customizing options for radius, inner-radius, pie progress, track and progress thickness.
                    </p>
                </div>
            </div>);
    }
}
