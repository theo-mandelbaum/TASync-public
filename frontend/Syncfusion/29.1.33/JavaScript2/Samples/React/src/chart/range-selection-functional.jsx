/**
 * Sample for Range Selection in chart
 */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Selection, Legend, ColumnSeries, Category, ScatterSeries } from '@syncfusion/ej2-react-charts';
import { updateSampleSection } from '../common/sample-base';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { PropertyPane } from '../common/property-pane';
import { loadChartTheme } from './theme-color';
export let data = [
    { x: 1971, y: 50 }, { x: 1972, y: 20 }, { x: 1973, y: 63 }, { x: 1974, y: 81 }, { x: 1975, y: 64 },
    { x: 1976, y: 36 }, { x: 1977, y: 22 }, { x: 1978, y: 78 }, { x: 1979, y: 60 }, { x: 1980, y: 41 },
    { x: 1981, y: 62 }, { x: 1982, y: 56 }, { x: 1983, y: 96 }, { x: 1984, y: 48 }, { x: 1985, y: 23 },
    { x: 1986, y: 54 }, { x: 1987, y: 73 }, { x: 1988, y: 56 }, { x: 1989, y: 67 }, { x: 1990, y: 79 },
    { x: 1991, y: 18 }, { x: 1992, y: 78 }, { x: 1993, y: 92 }, { x: 1994, y: 43 }, { x: 1995, y: 29 },
    { x: 1996, y: 14 }, { x: 1997, y: 85 }, { x: 1998, y: 24 }, { x: 1999, y: 61 }, { x: 2000, y: 80 },
    { x: 2001, y: 14 }, { x: 2002, y: 34 }, { x: 2003, y: 81 }, { x: 2004, y: 70 }, { x: 2005, y: 21 },
    { x: 2006, y: 70 }, { x: 2007, y: 32 }, { x: 2008, y: 43 }, { x: 2009, y: 21 }, { x: 2010, y: 63 },
    { x: 2011, y: 9 }, { x: 2012, y: 51 }, { x: 2013, y: 25 }, { x: 2014, y: 96 }, { x: 2015, y: 32 }
];
export let data1 = [
    { x: 1971, y: 23 }, { x: 1972, y: 67 }, { x: 1973, y: 83 }, { x: 1974, y: 43 }, { x: 1975, y: 8 },
    { x: 1976, y: 41 }, { x: 1977, y: 56 }, { x: 1978, y: 31 }, { x: 1979, y: 29 }, { x: 1980, y: 87 },
    { x: 1981, y: 43 }, { x: 1982, y: 12 }, { x: 1983, y: 38 }, { x: 1984, y: 67 }, { x: 1985, y: 49 },
    { x: 1986, y: 67 }, { x: 1987, y: 83 }, { x: 1988, y: 16 }, { x: 1989, y: 89 }, { x: 1990, y: 18 },
    { x: 1991, y: 46 }, { x: 1992, y: 39 }, { x: 1993, y: 68 }, { x: 1994, y: 87 }, { x: 1995, y: 45 },
    { x: 1996, y: 42 }, { x: 1997, y: 28 }, { x: 1998, y: 82 }, { x: 1999, y: 13 }, { x: 2000, y: 83 },
    { x: 2001, y: 26 }, { x: 2002, y: 57 }, { x: 2003, y: 48 }, { x: 2004, y: 84 }, { x: 2005, y: 64 },
    { x: 2006, y: 24 }, { x: 2007, y: 82 }, { x: 2008, y: 37 }, { x: 2009, y: 68 }, { x: 2010, y: 37 },
    { x: 2011, y: 35 }, { x: 2012, y: 81 }, { x: 2013, y: 38 }, { x: 2014, y: 51 }, { x: 2015, y: 58 }
];
const SAMPLE_CSS = `
    .control-fluid {
        padding: 0px !important;
    }
    #select:hover {
        cursor: pointer;
    }`;
const RangeSelection = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [selectionMode, setSelectionMode] = useState('DragXY');
    let chartInstance = useRef(null);
    let dropElement = useRef(null);
    let checkElement = useRef(null);
    let droplist = [
        { value: 'DragXY' },
        { value: 'DragX' },
        { value: 'DragY' },
        { value: 'Lasso' }
    ];
    const onChartLoad = (args) => {
        document.getElementById('charts').setAttribute('title', '');
    };
    const load = (args) => {
        loadChartTheme(args);
    };
    const change = () => {
        chartInstance.current.selectionMode = dropElement.current.value;
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.refresh();
    };
    const check = () => {
        chartInstance.current.series[0].animation.enable = false;
        chartInstance.current.series[1].animation.enable = false;
        chartInstance.current.refresh();
        chartInstance.current.allowMultiSelection = checkElement.current.checked;
    };
    return (<div className='control-pane'>
            <style>{SAMPLE_CSS}</style>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} primaryXAxis={{ minimum: 1970, maximum: 2016, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} primaryYAxis={{ title: 'Sales', labelFormat: '{value}%', interval: 25, minimum: 0, maximum: 100, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} legendSettings={{ visible: true, toggleVisibility: false }} title='Profit Comparision of A and B' loaded={onChartLoad.bind(this)} selectionMode={selectionMode} load={load.bind(this)}>
                        <Inject services={[Selection, Legend, ColumnSeries, Category, ScatterSeries]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data} name='Product A' xName='x' yName='y' type='Scatter' marker={{ shape: 'Triangle', width: 10, height: 10 }}/> 
                            <SeriesDirective dataSource={data1} name='Product B' xName='x' yName='y' type='Scatter' marker={{ shape: 'Pentagon', width: 10, height: 10 }}/> 
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                        <tbody><tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Selection Mode:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="selmode" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="DragXY"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '80%' }}>
                                    <div id="multiSelection">Enable MultipleSelection:</div>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div><input type="checkbox" id="select" onChange={check.bind(this)} ref={checkElement} aria-labelledby="Checkbox unchecked"/></div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the range selection behavior and its mode in the charts.</p>
            </div>
            <div id="description">
                <p>In this example, you can see how to select points in a specific region. You can change the <b>Selection Mode</b> in the properties panel. You can also enable multiple selection.</p>
                <p>Click and drag to enable a rectangular selection and it will display the collection of points that are selected under the region.</p>
                <p>Rectangular selection can be set using the <code>SelectionMode</code> property, and it supports the following modes.</p>
                <ul>
                    <li><code>Series</code> - Select the series in chart.</li>
                    <li><code>Point</code> - Select a point in the series .</li>
                    <li><code>Cluster</code> - Select a group of points in the chart.</li>
                    <li><code>DragXY</code> - Rectangular selection with respect to both axis.</li>
                    <li><code>DragX</code> - Rectangular selection with respect to horizontal axis.</li>
                    <li><code>DragY</code> - Rectangular selection with respect to vertical axis.</li>
                    <li><code>Lasso</code> - Select free form of selection area points.</li>
                </ul>
                <p><b>Injecting Module</b></p>
                <p>
                    Chart component features are segregated into individual feature-wise modules. To use selection feature, we need to inject <code>Selection</code> module into <code>services</code>.
                </p>
            </div>
        </div>);
};
export default RangeSelection;
