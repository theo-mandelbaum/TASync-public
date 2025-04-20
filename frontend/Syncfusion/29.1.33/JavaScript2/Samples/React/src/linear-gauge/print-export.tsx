import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    LinearGaugeComponent, ILoadedEventArgs, LinearGaugeTheme, AxesDirective, AxisDirective,
    Inject, PointersDirective, PointerDirective, Annotations,
    ExportType, RangeDirective, RangesDirective,
    Print, PdfExport, ImageExport
} from '@syncfusion/ej2-react-lineargauge';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { TextBoxComponent } from "@syncfusion/ej2-react-inputs";
    
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    
    #btn-control {
        width: 100%;
        text-align: center;
        text-transform:none !important;
    }

    .e-play-icon::before {
        content: '\\e728';
    }

	.e-play-icon1::before {
        content: "\\e34b";
    }

    .e-view.fluent .e-play-icon::before, .e-view.fluent-dark .e-play-icon::before {
        content: '\\e72e';
    }

    .e-view.fluent .e-play-icon1::before, .e-view.fluent-dark .e-play-icon1::before {
        content: '\\e75d';
    }
   
    .e-view.fabric .e-play-icon1::before, .e-view.fabric-dark .e-play-icon1::before
    {
        content: '\\e7df';
    }

    .e-view.fabric .e-play-icon::before, .e-view.fabric-dark .e-play-icon::before 
    {
        content: '\\e710';
    }

    .e-view.bootstrap .e-play-icon1::before {
        content: '\\ebd2';
    }

    .e-view.bootstrap4 .e-play-icon::before {
        content: '\\e780';
    }

    .e-view.bootstrap4 .e-play-icon1::before {
        content: '\\e743';
    }

    .e-view.highcontrast .e-play-icon1::before {
        content: '\\ebf9';
    }

    .e-view.highcontrast .e-play-icon::before {
        content: '\\e710';
    }

    .e-view.bootstrap5 .e-play-icon::before, .e-view.bootstrap5-dark .e-play-icon::before {
        content: '\\e72e';
    }

    .e-view.bootstrap5 .e-play-icon1::before, .e-view.bootstrap5-dark .e-play-icon1::before {
        content: '\\e75d';
    }`;

export class Export extends SampleBase<{}, {}> {
    private gauge: LinearGaugeComponent;
    private mode: DropDownListComponent;
    private textElement: TextBoxComponent;
    private type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' }
    ];

    public load(args: ILoadedEventArgs): void {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5')) as LinearGaugeTheme;
        // custom code end
    }

    public onClickPrint(e: Event): void {
        this.gauge.print();
    }

    public onClickExport(e: Event): void {
        let fileName: string = this.textElement.value;
        this.gauge.export((this.mode.value as ExportType), fileName);
    }

    render() {
        return (
            <main><div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section row'>
                    <div className='col-lg-8'>
                        <LinearGaugeComponent load={this.load.bind(this)} id='gauge' allowPrint={true} allowPdfExport={true} allowImageExport={true} title='Speedometer' titleStyle={{ fontFamily: 'inherit' }} orientation='Horizontal' ref={gauge => this.gauge = gauge}>
                            <Inject services={[Annotations, Print, PdfExport, ImageExport]} />
                            <AxesDirective>
                                <AxisDirective minimum={0} maximum={120} line={{ width: 0 }}
                                    minorTicks={{ height: 7, width: 0, interval: 4 }}
                                    majorTicks={{ height: 0, width: 0, interval: 20 }}
                                    labelStyle={{ position: "Outside", font: { fontFamily: 'inherit' }, offset: 4 }}>
                                    <RangesDirective>
                                        <RangeDirective start={0} end={20} startWidth={15} endWidth={25} color='#82b944' >
                                        </RangeDirective>
                                        <RangeDirective start={20} end={40} startWidth={25} endWidth={35} color='#a1cb43' >
                                        </RangeDirective>
                                        <RangeDirective start={40} end={60} startWidth={35} endWidth={45} color='#ddec12' >
                                        </RangeDirective>
                                        <RangeDirective start={60} end={80} startWidth={45} endWidth={55} color='#ffbc00' >
                                        </RangeDirective>
                                        <RangeDirective start={80} end={100} startWidth={55} endWidth={65} color='#ff6000' >
                                        </RangeDirective>
                                        <RangeDirective start={100} end={120} startWidth={65} endWidth={75} color='red' >
                                        </RangeDirective>
                                    </RangesDirective>
                                    <PointersDirective>
                                        <PointerDirective value={80} height={23} width={35} offset={-55} markerType='Triangle' border={{ width: 2, color: 'white' }}>
                                        </PointerDirective>
                                    </PointersDirective>
                                </AxisDirective>
                            </AxesDirective>
                        </LinearGaugeComponent>
                    </div>
                    {/* Property Panel */}
                    <div className='col-lg-4 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' role="none" title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                              <tbody>
                                <tr style={{ height: "50px" }}>
                                    <td>
                                        <div style={{ width: '80%', marginLeft: '-10px' }}>Export Type</div>
                                    </td>
                                    <td>
                                        <div>
                                            <DropDownListComponent width={'100%'} id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td>
                                        <div style={{ width: '80%', marginLeft: '-10px' }}>File Name</div>
                                    </td>
                                    <td>
                                        <div style={{ 'marginTop': '0px', height: '45px' }}>
                                            <TextBoxComponent className="e-input" value='Linear Gauge' style={{ width: '100%', padding: "0px", paddingLeft: '5px' }} id="fileName" ref={d => this.textElement = d}></TextBoxComponent>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '60px' }}>
                                    <td style={{ width: '50%' }}>
                                        <div id="btn-control">
                                            <ButtonComponent onClick={this.onClickExport.bind(this)} style={{marginLeft:'30%' }} isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                    <td style={{ width: '50%' }}>
                                        <div id="btn-control">
                                            <ButtonComponent onClick={this.onClickPrint.bind(this)} style={{ marginLeft:'-20%' }} isPrimary={true}>Print</ButtonComponent>
                                        </div>
                                    </td>
                                </tr>
                              </tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
            </div >
                <section id="action-description" aria-label="Description of Linear Gauge sample">
                    <p>
                        This sample demonstrates the print and export functionalities of the linear gauge.
                    </p>
                </section>
                <section id="description" aria-label="Description of the Linear Gauge features demonstrated in this sample">
                    <p>
                        In this example, you can see how to print and export the rendered linear gauge. You can add print functionality by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#print">print</a> method when <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowprint">allowPrint</a> is set as <b>true</b>. Also, you can add export functionality by using the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#export">export</a> method when <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowimageexport">allowImageExport</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#allowpdfexport">allowPdfExport</a> are set as <b>true</b>. The linear gauge can be exported to JPEG, PNG, SVG, and PDF formats.
                    </p>
                    <p>
                        More information about print and export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/linear-gauge/print-and-export/">documentation section</a>.
                    </p>
                </section>
        </main>
        )
    }
}
