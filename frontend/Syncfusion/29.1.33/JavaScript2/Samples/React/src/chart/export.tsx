/**
 * Sample for chart export
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, SeriesDirective, ChartTheme,
    ILoadedEventArgs, Category, ColumnSeries, Inject, IPointRenderEventArgs, Legend, ExportType, Export, DataLabel
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { } from '@syncfusion/ej2-react-inputs';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { fabricColors, bootstrapColors, materialColors, highContrastColors, fluentColors, fluentDarkColors, bootstrap5Colors, pointTailwindColors, pointTailwindDarkColors, pointTailwind3Colors, pointTailwind3DarkColors} from './theme-color';
import { PropertyPane } from '../common/property-pane';
import { EmitType, Browser } from '@syncfusion/ej2-base';
import { SampleBase } from '../common/sample-base';

export let data1: any[] = [
    { x: 'DEU', y: 35.5 }, { x: 'CHN', y: 18.3 }, { x: 'ITA', y: 17.6 }, { x: 'JPN', y: 13.6 },
    { x: 'US', y: 12 }, { x: 'ESP', y: 5.6 }, { x: 'FRA', y: 4.6 }, { x: 'AUS', y: 3.3 },
    { x: 'BEL', y: 3 }, { x: 'UK', y: 2.9 }
];

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #btn-control {
        width: 100%;
        text-align: center;
    }

    .e-export-icon::before {
        content: '\\e728';
    }
    
    .e-view.fabric .e-export-icon::before, .e-view.fabric-dark .e-export-icon::before  {
        content: '\\e710';
    }
    
    .e-view.bootstrap4 .e-export-icon::before {
        content: '\\e780';
    }
    
    .e-view.tailwind3-dark .e-icons.e-export::before, .e-view.tailwind3 .e-icons.e-export::before {
        content: '\\e7bf';
    }
    
    .e-view.highcontrast .e-export-icon::before {
        content: '\\e710';
    }
    
    .e-view.bootstrap5 .e-export-icon::before, .e-view.bootstrap5-dark .e-export-icon::before {
        content: '\\e72e';
    }`;
export class ChartExport extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;
    private mode: DropDownListComponent;
    private type: { [key: string]: Object }[] = [
        { value: 'JPEG' },
        { value: 'PNG' },
        { value: 'SVG' },
        { value: 'PDF' },
        { value: 'XLSX' },
        { value: 'CSV' }
    ];
    render() {
        return (
            <div className='control-pane'>
                <style>{SAMPLE_CSS}</style>
                <div className='control-section row'>
                    <div className='col-lg-9'>
                        <ChartComponent id='charts' ref={chart=>this.chartInstance=chart} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: {width : 0}, minorTickLines: {width: 0}, labelIntersectAction: "None", labelRotation: -45, interval: 1 }} chartArea={{ border: { width: 0 } }} primaryYAxis={{ labelFormat: '{value}GW', minimum: 0, maximum: 40, interval: 10, lineStyle: {width : 0}, majorGridLines: { width: 2 }, minorTickLines: {width: 0}, majorTickLines: {width : 0} }} pointRender={this.labelRender.bind(this)} load={this.load.bind(this)} legendSettings={{ visible: false }} title="Top 10 Countries Using Solar Power" loaded={this.onChartLoad.bind(this)}>
                            <Inject services={[ColumnSeries, Category, Legend, Export, DataLabel]} />
                            <SeriesCollectionDirective>
                                <SeriesDirective dataSource={data1} name='Measurements (in Gigawatt)' xName='x' yName='y' width={2} marker={{ dataLabel: { visible: true, name: 'DataLabelMappingName', enableRotation: Browser.isDevice ? true : false, angle: -90, position: 'Top', font: {  fontWeight: '600', color: '#ffffff', size: '9px' } } }} type='Column' />
                            </SeriesCollectionDirective>
                        </ChartComponent>
                    </div>
                    <div className='col-lg-3 property-section'>
                        <PropertyPane title='Properties'>
                            <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                            <tbody><tr style={{ height: "50px" }}>
                                    <td style={{ width: "30%" }}>
                                        Export Type:
                            </td>
                                    <td style={{ width: "30%" }}>
                                    <div style={{ "marginLeft": "-10px", width: "100%"}}>
                                        <DropDownListComponent id="etype" value="JPEG" ref={d => this.mode = d} dataSource={this.type} fields={{ text: 'value', value: 'value' }} placeholder="JPEG" />
                                    </div>
                                    </td>
                                </tr>
                                <tr style={{ height: "50px" }}>
                                    <td style={{ width: "40%" }} id="exportFile">
                                        File Name:
                            </td>
                                    <td style={{ width: "40%" }}>
                                        <div className="e-float-input" style={{ 'marginTop': '0px' }}>
                                            <input type="text" defaultValue="Chart" id="fileName" style={{ "marginLeft": "-10px" }} aria-labelledby="Chart"/>
                                        </div>
                                    </td>
                                </tr>
                                <tr style={{ height: '50px' }}>
                                    <td>
                                        <div id="btn-control" style={{ 'marginLeft': '50%' }}>
                                            <ButtonComponent id="chart-export" iconCss='e-icons e-export icon' isPrimary={true}>Export</ButtonComponent>
                                        </div>
                                    </td>
                                </tr></tbody>
                            </table>
                        </PropertyPane>
                    </div>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates client-side exporting of the chart, enabling you to export its data to Excel, PDF, and CSV formats. Additionally, it allows you to save the chart in image formats such as JPEG, PNG, and SVG.</p>
                </div>
                <div id="description">
                <p>In this example, you can see how the export functionality is configured. The rendered chart can be exported in JPEG, PNG, SVG, and PDF file types. Data from the chart can also be exported to Excel and CSV files.</p>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use export, we need to inject <code>export</code> module into <code>services</code>.
                    </p>
                    <p>
                        More information on the export can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/chart-print/#export" aria-label="Navigate to the documentation for Export in React Chart component">documentation section</a>.
                    </p>
                </div>
            </div >
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light").replace(/contrast/i,'Contrast').replace(/-highContrast/i, 'HighContrast') as ChartTheme;
    };
        
    public labelRender(args: IPointRenderEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'material';
        if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
            args.fill = fabricColors[args.point.index % 10];
        } else if (selectedTheme === 'material') {
            args.fill = materialColors[args.point.index % 10];
        } else if (selectedTheme === 'highcontrast') {
            args.fill = highContrastColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent') {
            args.fill = fluentColors[args.point.index % 10];
        } else if (selectedTheme === 'fluent-dark') {
            args.fill = fluentDarkColors[args.point.index % 10];
        }
        else if (selectedTheme === 'bootstrap5' || selectedTheme === 'bootstrap5-dark') {
            args.fill = bootstrap5Colors[args.point.index % bootstrap5Colors.length];
        }
        else if (selectedTheme === 'tailwind') {
            args.fill = pointTailwindColors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind-dark') {
            args.fill = pointTailwindDarkColors[args.point.index % 10];
        }
        else if (selectedTheme === 'tailwind3') {
            args.fill = pointTailwind3Colors[args.point.index % 10];
        } else if (selectedTheme === 'tailwind3-dark') {
            args.fill = pointTailwind3DarkColors[args.point.index % 10];
        }
        else {
            args.fill = bootstrapColors[args.point.index % bootstrapColors.length];
        }
    }
    public onClick(e: Event): void {
        let fileName: string = (document.getElementById('fileName') as HTMLInputElement).value;
        this.chartInstance.exportModule.export((this.mode.value as ExportType), fileName);
    }
}