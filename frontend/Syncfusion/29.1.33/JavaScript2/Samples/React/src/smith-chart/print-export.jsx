/**
 * print and export sample for smith chart
 */
import * as React from "react";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { SmithchartComponent, SmithchartSeriesCollectionDirective, SmithchartSeriesDirective, Inject, TooltipRender, SmithchartLegend } from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
import { loadSmithChartTheme } from './theme-color';
export class Print extends SampleBase {
    // Code for Property Panel
    smithchartInstance;
    positionElement;
    mode;
    nameElement;
    droplist = [
        { text: 'JPEG', value: 'JPEG' },
        { text: 'PNG', value: 'PNG' },
        { text: 'SVG', value: 'SVG' },
        { text: 'PDF', value: 'PDF' },
    ];
    onClick2(e) {
        this.smithchartInstance.print();
    }
    onClick1(e) {
        let fileName = document.getElementById('fileName').value;
        this.smithchartInstance.export(this.mode.value, fileName);
    }
    load(args) {
        loadSmithChartTheme(args);
    }
    render() {
        return (<div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-lg-9 control-section'>
                    <SmithchartComponent load={this.load.bind(this)} id='container' ref={gauge => this.smithchartInstance = gauge} horizontalAxis={{ minorGridLines: { visible: true } }} legendSettings={{ visible: true, shape: 'Circle' }} //To config the legend for smithchart                        
         radialAxis={{ minorGridLines: { visible: true } }}>
                        <Inject services={[TooltipRender, SmithchartLegend]}/>
                        <SmithchartSeriesCollectionDirective>
                            <SmithchartSeriesDirective points={[
                { resistance: 0.15, reactance: 0 }, { resistance: 0.15, reactance: 0.15 },
                { resistance: 0.18, reactance: 0.3 }, { resistance: 0.2, reactance: 0.4 },
                { resistance: 0.25, reactance: 0.6 }, { resistance: 0.38, reactance: 0.95 },
                { resistance: 0.6, reactance: 1.25 }, { resistance: 1, reactance: 1.6 },
                { resistance: 1.65, reactance: 1.9 }, { resistance: 2.75, reactance: 2 },
                { resistance: 4.5, reactance: 0 }, { resistance: 3, reactance: -2 },
                { resistance: 1.65, reactance: -1.95 }, { resistance: 1, reactance: -1.65 },
                { resistance: 0.6, reactance: -1.25 }, { resistance: 0.35, reactance: -0.9 },
                { resistance: 0.25, reactance: -0.6 }, { resistance: 0.25, reactance: -0.4 },
                { resistance: 0.25, reactance: -0.3 }, { resistance: 0.25, reactance: -0.15 },
                { resistance: 0.25, reactance: 0 },
            ]} name='Transmission' enableAnimation={true} tooltip={{ visible: true }} marker={{ shape: 'Circle', visible: true, border: { width: 2 } }}>
                            </SmithchartSeriesDirective>
                        </SmithchartSeriesCollectionDirective>
                    </SmithchartComponent>
                </div>
                {/* Property Panel*/}
                <div className='col-lg-3 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody>
                            <tr style={{ 'height': '50px' }}>
                                <td style={{ 'width': '40%' }}>
                                    <div>Export Type</div>
                                </td>
                                <td style={{ 'width': '60%' }}>
                                    <div style={{ 'marginLeft': '-10px' }}>
                                        <DropDownListComponent id="mode" width="100px" index={0} placeholder="JPEG" ref={d => this.mode = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }}/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ 'height': '50px' }}>
                                <td style={{ 'width': '40%' }}>
                                    <div id="filename">File Name</div>
                                </td>
                                <td style={{ 'width': '60%' }}>
                                    <div className="e-float-input" style={{ 'marginTop': '0px', 'marginLeft': '-10px' }}>
                                        <input id="fileName" ref={d => this.nameElement = d} type="text" defaultValue="Smith chart" style={{ "width": "100px" }} aria-labelledby="Smith Chart"/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="btn-control" style={{ 'marginLeft': '50%' }}>
                                        <ButtonComponent id="smith-export" isPrimary={true} iconCss='e-icons e-export-icon'>Export</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="btn-control" style={{ 'marginLeft': '50%' }}>
                                        <ButtonComponent id="smith-print" isPrimary={true} iconCss='e-icons e-print-icon'>Print</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample explores the exporting and printing functionality in Smith chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to export and print the rendered Smith chart. Smith chart can be exported to JPEG, PNG, SVG, and PDF formats.
                    </p>
                </div>
            </div>);
    }
}
