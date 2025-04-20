/**
 * Default sample
 */
import * as ReactDOM from 'react-dom';
import * as React from "react";
import { useEffect, useRef, useState } from 'react';
import {
    ProgressBarComponent, ProgressBarAnnotationsDirective, ProgressBarAnnotationDirective, Inject,
    ProgressAnnotation, ILoadedEventArgs, ProgressTheme, AnimationModel
} from '@syncfusion/ej2-react-progressbar';
import { EmitType } from '@syncfusion/ej2-base';
import { updateSampleSection } from '../common/sample-base';
import { loadProgressBarTheme } from './theme-colors';


const SAMPLE_CSS = `
 #control-container {
     padding: 0px !important;
 }
 
 .linear-parent {
     text-align: center;
     width: 75%;
     margin: auto !important;
 }
 
 .linear-button {
    text-align: center;
    padding:2%;
 }
 
 .progressbar-mode {
     text-align: left;
     font-family: Roboto-Regular;
     font-size: 14px;
     color: #3D3E3C;
     margin-left: 10px;
     margin-top: 5%;
     padding: 0px;
     top: 20px;
 }
 
 #reLoad {
     border-radius: 4px;
     text-transform: capitalize;
 }
     `;

const ProgressBarProgressSegment = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])

    const circularSeg = useRef<ProgressBarComponent>(null);
    let [value, setValue] = useState<number>(40);
    const content: string = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
    const animation: AnimationModel = {
        enable: true,
        duration: 2000,
    };
    const load: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        loadProgressBarTheme(args);
    }

    const progressLoad: EmitType<ILoadedEventArgs> = (args: ILoadedEventArgs) => {
        loadProgressBarTheme(args);
        switch (args.progressBar.theme) {
            case 'Material':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                break;
            case 'Fabric':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                break;
            case 'Bootstrap':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                break;
            case 'Bootstrap4':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                break;
            case 'Tailwind':
            case 'Tailwind3':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                break;
            case 'BootstrapDark':
            case 'FabricDark':
            case 'MaterialDark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                break;
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
            case 'Fluent':
            case 'FluentDark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                break;
            case 'TailwindDark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                break;
            case 'Tailwind3Dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                break;
            case 'Material3':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                break;
            case 'Material3Dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                break;
            case "Fluent2":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                break;
            case "Fluent2Dark":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                break;
            case "Fluent2HighContrast":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                break; 
            default:
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#FFD939"><span></span></div>';
                break;
        }
    }

    const timing = (): void => {
        if (value >= circularSeg.current.maximum) {
            clearInterval(timer);
        } else {
            setValue(value += 20);
        }
    }
    const timer: any = setInterval(timing, 2500);

    return (
        <div className='control-pane'>
            <style>
                {SAMPLE_CSS}
            </style>
            <div className="control-section">
                <div className="row linear-parent">
                    <div>
                        <div className="col-lg-12 col-sm-12 progressbar-mode"></div>
                        <div id="linearSegment">
                            <ProgressBarComponent id="progress-linearSegment" type='Linear' height='30' width='70%' value={value}
                                segmentCount={50} gapWidth={5} trackThickness={15} progressThickness={15} cornerRadius='Square'
                                animation={animation} load={load.bind(this)} >
                            </ProgressBarComponent>
                        </div>
                    </div>
                    <div>
                        <div className="col-lg-12 col-sm-12 progressbar-mode"></div>
                        <div id="circularSegment">
                            <ProgressBarComponent id="progress-circularSegment" ref={circularSeg} type='Circular' height='200px' width='200px'
                                value={value} segmentCount={50} gapWidth={5} trackThickness={15} progressThickness={15} startAngle={220}
                                endAngle={140} cornerRadius='Square' animation={animation} load={progressLoad.bind(this)}>
                                <Inject services={[ProgressAnnotation]} />
                                <ProgressBarAnnotationsDirective>
                                    <ProgressBarAnnotationDirective content={content} />
                                </ProgressBarAnnotationsDirective>
                            </ProgressBarComponent>
                        </div>
                    </div>
                </div>
            </div>
            <div id="action-description">
                <p>
                    This sample illustrates a segmented progress of a task.
                </p>
            </div>
            <div id="description">
                <p>This demo for Progress Bar control shows the segmented progress of a task using <code>segmentCount</code> and <code>gapWidth</code> property.</p>
            </div>
        </div>
    )

}
export default ProgressBarProgressSegment;