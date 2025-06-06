import * as React from "react";
import { useRef, useState } from "react";
import { HeatMapComponent, Legend, Tooltip, Inject } from '@syncfusion/ej2-react-heatmap';
import * as data from './color-range-sample-data.json';
import { updateSampleSection } from '../common/sample-base';
import { PropertyPane } from "../common/property-pane";
import { RadioButtonComponent } from "@syncfusion/ej2-react-buttons";
const ColorRange = () => {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    const [paletteType, setPaletteType] = useState('Gradient');
    let heatmap = useRef(null);
    let title = {
        text: 'U.S. Government Energy Consumption by Agency (Trillion Btu)',
        textStyle: {
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'inherit',
            size: '15px',
        }
    };
    let xAxis = {
        labels: ['2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'],
        labelIntersectAction: 'None',
        labelRotation: 45,
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    let yAxis = {
        labels: ['Agriculture', 'Energy', 'Administration', 'Health', 'Interior', 'Justice', 'NASA', 'Transportation'],
        textStyle: {
            fontFamily: 'inherit'
        }
    };
    let paletteSettings = {
        palette: [
            { startValue: 5, endValue: 15, minColor: '#FFFFDA', maxColor: '#EDF8B6' },
            { startValue: 15, endValue: 20, minColor: '#CAE8B4', maxColor: '#78D1BD' },
            { startValue: 20, endValue: 31.7, minColor: '#36BCC6', maxColor: '#208FC6' },
        ],
        type: paletteType
    };
    let cellSettings = {
        border: { width: 0 },
        showLabel: false
    };
    const fixed = () => {
        setPaletteType('Fixed');
        heatmap.current.dataBind();
    };
    const gradient = () => {
        setPaletteType('Gradient');
        heatmap.current.dataBind();
    };
    const load = (args) => {
        if (args.heatmap.element.offsetWidth < 500) {
            args.heatmap.xAxis.labelRotation = 0;
            args.heatmap.xAxis.labelIntersectAction = 'Trim';
        }
        else {
            args.heatmap.xAxis.labelRotation = 45;
            args.heatmap.xAxis.labelIntersectAction = 'None';
        }
    };
    return (<main><div>
            <div className='col-md-9 control-section'>

                <HeatMapComponent id='heatmap-container' ref={heatmap} titleSettings={title} legendSettings={{ textStyle: { fontFamily: 'inherit' } }} tooltipSettings={{ textStyle: { fontFamily: 'inherit' } }} xAxis={xAxis} yAxis={yAxis} dataSource={data.colorRangeSample} paletteSettings={paletteSettings} cellSettings={cellSettings} load={load.bind(this)}>
                    <Inject services={[Legend, Tooltip]}/>
                </HeatMapComponent>
            </div>
            <div className="col-md-3 property-section">
                <PropertyPane title='Properties'>
                    <table id='property' role='none' title='Properties' className='property-panel-table' style={{ width: '100%', marginLeft: -10 }}>
                        <tbody>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Palette Type:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div className='row'>
                                        <RadioButtonComponent id='fixed' label='Fixed' name='paletteType' value="Fixed" change={fixed}/>
                                    </div>
                                    <div className='row'>
                                        <RadioButtonComponent id='gradient' checked={true} label='Gradient' name='paletteType' value="Gradient" change={gradient}/>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </PropertyPane>
            </div>
        </div>
            <section id="action-description" aria-label="Description of HeatMap sample">
                <p>
                    This sample visualizes the energy consumption in trillion British thermal units (btu) by
                    the various public sectors in US government over the years. The data label is disabled in this sample,
                    the tooltip displays the data point values.  In property panel, the options are available to change
                    palette type in Heatmap by means of radio button.
                </p>
            </section>
            <section id="description" aria-label="Description of the HeatMap features demonstrated in this sample">
                <p>
                This example explains how to provide a specific color for specific range in heatmap. The <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#startvalue" target="_blank"> startValue </a> and <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#endvalue" target="_blank"> endValue </a> properties are used to define the range start and end values. The <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#mincolor" target="_blank"> minColor </a> and <a href="https://ej2.syncfusion.com/react/documentation/api/heatmap/paletteCollectionModel/#maxcolor" target="_blank"> maxColor </a> properties represent the colors of given range.
                </p>
                <p>The tooltip is enabled in this example. To see the tooltip in action, hover the mouse over an item or tap an item on touch-enabled devices.</p>
                <br></br>
                <p><b>Injecting Module</b></p>
                <p>
                    Heatmap component features are separated into discrete feature-based modules. To use a tooltip and the legend, inject the <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/tooltip">Tooltip</a> and <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/heatmap-chart/legend">Legend</a> module using the <code>{'<Inject services={[Tooltip, Legend]} />'}</code> method.
                </p>
            </section>
    </main>);
};
export default ColorRange;
