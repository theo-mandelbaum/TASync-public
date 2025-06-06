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
     .annotaion-pro {
             font-family: Roboto-Regular;
             font-size: 20px;
             color: #1B1C1A;
             letter-spacing: 0.01px;
         }
         .progress-bar-parent {
             margin-top: 8%;
             text-align: center;
         }
         .progress-text {
             display: inline-flex;
             margin: auto;
         }
         .progress-text-align {
             font-family: Roboto-Regular;
             font-size: 12px;
             color: #3D3E3C;
             letter-spacing: 0;
             margin: auto;
         }

         #control-container {
             padding: 0px !important;
         }

         .progress-container-align {
             text-align: center;
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
export class ProgressBarSemiCircular extends SampleBase {
    annotationColors = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939', '#9A9A9A', '#22D3EE', '#0D6EFD', '#6750A4', '#D0BCFF', '#0F6CBD', '#1AEBFF', '#115EA3', '#6366F1'];
    content1 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    content2 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    content3 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    content4 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    thickness = 5;
    inverseSemiProgress;
    verticalProgress;
    semiProgress;
    verticalOppose;
    onclick() {
        this.inverseSemiProgress.refresh();
        this.verticalProgress.refresh();
        this.verticalOppose.refresh();
        this.semiProgress.refresh();
    }
    annotationElementContent(color, controlID) {
        let content;
        switch (controlID) {
            case 'angle-container':
                content = '100%';
                break;
            case 'vertical-container':
                content = '100%';
                break;
            case 'vsemi-container':
                content = '100%';
                break;
            case 'semi-container':
                content = '100%';
                break;
        }
        return ('<div id="point1" style="font-size:24px;font-weight:bold;color: ' + color + ' "><span>' + content + '</span></div>');
    }
    progressLoad = (args) => {
        let selectedTheme = loadProgressBarTheme(args);
        switch (selectedTheme) {
            case 'Material':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[0], args.progressBar.element.id);
                break;
            case 'Fabric':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[1], args.progressBar.element.id);
                break;
            case 'Bootstrap':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[2], args.progressBar.element.id);
                break;
            case 'Bootstrap4':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[3], args.progressBar.element.id);
                break;
            case 'Tailwind':
            case 'Tailwind3':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[4], args.progressBar.element.id);
                break;
            case 'BootstrapDark':
            case 'FabricDark':
            case 'MaterialDark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[6], args.progressBar.element.id);
                break;
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
            case 'fluent':
            case 'FluentDark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[8], args.progressBar.element.id);
                break;
            case 'TailwindDark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[7], args.progressBar.element.id);
                break;
            case 'Tailwind3Dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[14], args.progressBar.element.id);
                break;
            case 'Material3':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[9], args.progressBar.element.id);
                break;
            case 'Material3Dark':
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[10], args.progressBar.element.id);
                break;
            case "Fluent2":
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[11], args.progressBar.element.id);
                break;
            case "Fluent2HighContrast":
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[12], args.progressBar.element.id);
                break;
            case "Fluent2Dark":
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[13], args.progressBar.element.id);
                break;
            default:
                args.progressBar.annotations[0].content = this.annotationElementContent(this.annotationColors[5], args.progressBar.element.id);
                break;
        }
    };
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className="control-section progress-bar-parent">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="progress-container-align">
                                <ProgressBarComponent id="angle-container" ref={progress1 => this.inverseSemiProgress = progress1} type='Circular' startAngle={240} endAngle={120} width='160px' height='160px' minimum={0} maximum={100} value={100} cornerRadius='Round' trackThickness={this.thickness} progressThickness={this.thickness} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }} load={this.progressLoad.bind(this)}>
                                    <Inject services={[ProgressAnnotation]}/>
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content1}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="progress-container-align">
                                <ProgressBarComponent id="vertical-container" ref={progress2 => this.verticalProgress = progress2} type='Circular' startAngle={180} endAngle={0} width='160px' height='160px' minimum={0} maximum={100} value={100} cornerRadius='Round' trackThickness={this.thickness} progressThickness={this.thickness} load={this.progressLoad.bind(this)} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }}>
                                    <Inject services={[ProgressAnnotation]}/>
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content2}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="progress-container-align">
                                <ProgressBarComponent id="vsemi-container" ref={progress3 => this.verticalOppose = progress3} type='Circular' startAngle={0} endAngle={180} width='160px' height='160px' minimum={0} maximum={100} value={100} cornerRadius='Round' trackThickness={this.thickness} progressThickness={this.thickness} load={this.progressLoad.bind(this)} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }}>
                                    <Inject services={[ProgressAnnotation]}/>
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content3}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-3 col-3 progress-container">
                            <div className="progress-container-align">
                                <ProgressBarComponent id="semi-container" ref={progress4 => this.semiProgress = progress4} type='Circular' startAngle={270} endAngle={90} width='160px' height='160px' minimum={0} maximum={100} value={100} cornerRadius='Round' trackThickness={this.thickness} progressThickness={this.thickness} load={this.progressLoad.bind(this)} animation={{
                enable: true,
                duration: 2000,
                delay: 0,
            }}>
                                    <Inject services={[ProgressAnnotation]}/>
                                    <ProgressBarAnnotationsDirective>
                                        <ProgressBarAnnotationDirective content={this.content4}>

                                        </ProgressBarAnnotationDirective>
                                    </ProgressBarAnnotationsDirective>
                                </ProgressBarComponent>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-12 reload-btn">
                            <button onClick={this.onclick.bind(this)} id="reLoad" className="e-control e-btn e-lib e-outline e-primary">Reload</button>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                    This sample illustrates a circular progress bar with start and end angle customized.
                </p>
                </div>
                <div id="description">
                    <p>This demo for Essential<sup>®</sup> JS2 Progress Bar control shows the customizing options for angle in circular progress bar.</p>
                </div>
            </div>);
    }
}
