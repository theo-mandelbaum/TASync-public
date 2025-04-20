import * as React from "react";
import * as ReactDOM from "react-dom";
import { useEffect, useRef } from "react";
import { HeatMapComponent, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme, Inject, ITooltipEventArgs, TitleModel, AxisModel, CellSettingsModel, PaletteSettingsModel } from '@syncfusion/ej2-react-heatmap';
import * as data from './table-bubble-data.json';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

// custom code start
const SAMPLE_CSS: any = `
    #control-container {
        padding: 0px !important;
    }
    #source{
        float: right; margin-right: 10p
    }`;
// custom code end
const BubbleTypes = () => {
    useEffect(() => {
        updateSampleSection();
    }, [])
    let heatmap = useRef<HeatMapComponent>(null);
    let droplist: { [key: string]: Object }[] = [
        { value: 'Size' },
        { value: 'Color' },
        { value: 'Sector' }
    ];
    let title: TitleModel = {
        text: 'Female Participation Rate in Labor Force for the Countries',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit'
        }
    }
    let xAxis: AxisModel = {
        labels: ['Singapore', 'Spain', 'Australia', 'Germany', 'Belgium', 'USA', 'France', 'UK'],
        labelRotation: 45,
        labelIntersectAction: 'None',
        textStyle: { fontFamily: 'inherit' }
    }
    let cellSettings: CellSettingsModel = {
        border: {
            width: 1
        },
        showLabel: false,
        tileType: 'Bubble',
        bubbleType: 'Size'
    }
    let paletteSettings: PaletteSettingsModel ={
        palette: [
            { value: 35, color: '#50A3B1' },
            { value: 45, color: '#78D1BD' },
            { value: 55, color: '#CAE8B4' },
            { value: 65, color: '#EDF8B6' },
            { value: 78, color: '#FFFFDA' }
        ]
    }
    const change = (e: Event): void => {
        let type: any = document.getElementById('LegendPosition');
        heatmap.current.cellSettings.bubbleType = type.value;
        heatmap.current.refresh();
    }

    const load = (args: ILoadedEventArgs): void => {
        // custom code start
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.heatmap.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5') as HeatMapTheme;
        // custom code end
    };

    const legendTooltip = (args: ITooltipEventArgs): void => {
        args.content = [args.xLabel + ' | ' + args.yLabel + ' : ' + args.value + ' %'];
    };

    return (
        <main><div>
            <div className='col-md-9 control-section'>
                {/* custom code start */}
                <style>{SAMPLE_CSS}</style>
                {/* custom code end */}
                <HeatMapComponent id='heatmap-container' ref={heatmap} titleSettings={title} xAxis={xAxis} yAxis={{ labels: ['1995', '2000', '2005', '2010', '2015'], textStyle: { fontFamily: 'inherit' }  }} dataSource={(data as any).tableBubbleData} tooltipSettings={{ textStyle: { fontFamily: 'inherit' } }} cellSettings={cellSettings} tooltipRender={legendTooltip} paletteSettings={paletteSettings} load={load.bind(this)} legendSettings={{ visible: true, textStyle: { fontFamily: 'inherit' }  }}>
                    <Inject services={[Legend, Tooltip]} />
                </HeatMapComponent>
                <div id="source">Source:
                    <a href="https://data.worldbank.org" target='_blank'>https://data.worldbank.org/</a>
                </div>
            </div>
            <div className="col-md-3 property-section">
                <PropertyPane title='Properties'>
                    <table id='property' title='Properties' role="none" className='property-panel-table' style={{ width: '100%', marginLeft: -10 }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '40%' }}>
                                    <div>Bubble Type:</div>
                                </td>
                                <td style={{ width: '60%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="LegendPosition" change={change.bind(this)} dataSource={droplist} fields={{ text: 'value', value: 'value' }} text="Size" value="Size" />
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div >
            <section id="action-description" aria-label="Description of HeatMap sample">
                <p>This sample visualizes the female participation rate of the total female population in the country’s work force. In Bubble Heatmap, the data points can be visualized using bubble size, bubble shade and sector view types. In property panel, the options are available to change the view of the data points in the bubble Heatmap by means of dropdown.</p>
            </section>
            <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>
                    In this example, you can see how to display the data points in bubble heatmap using multiple views such as bubble size, bubble shade and the sector. You can change the cell type to bubble by using the <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#tiletype">tileType</a> property in <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/">cellSettings</a> , and you can change the view of the bubble heatmap by using the <a target='_blank' href="https://ej2.syncfusion.com/react/documentation/api/heatmap/cellSettingsModel/#bubbletype">bubbleType</a> property in <code>cellSettings</code>.
                </p>
                <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over
                   an item or tap an item on touch-enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank"
                    href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                </p>
            </section>
        </main>
    );
}
export default BubbleTypes;
