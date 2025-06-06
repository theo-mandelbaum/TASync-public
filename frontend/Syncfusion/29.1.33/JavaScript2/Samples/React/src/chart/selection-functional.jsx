/**
 * Sample for Selection in chart
 */
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { ChartComponent, SeriesCollectionDirective, SeriesDirective, Inject, Selection, ColumnSeries, Legend, Category, ScatterSeries, Highlight } from '@syncfusion/ej2-react-charts';
import { PropertyPane } from '../common/property-pane';
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import { ColorPickerComponent, } from '@syncfusion/ej2-react-inputs';
import { updateSampleSection } from '../common/sample-base';
import { loadChartTheme } from './theme-color';
export let data1 = [
    { x: 'China', y: 17 }, { x: 'USA', y: 19 },
    { x: 'India', y: 29 }, { x: 'Japan', y: 13 },
    { x: 'Brazil', y: 24 }
];
export let data2 = [
    { x: 'China', y: 54 }, { x: 'USA', y: 67 },
    { x: 'India', y: 65 }, { x: 'Japan', y: 61 },
    { x: 'Brazil', y: 68 }
];
export let data3 = [
    { x: 'China', y: 9 }, { x: 'USA', y: 14 },
    { x: 'India', y: 6 }, { x: 'Japan', y: 26 },
    { x: 'Brazil', y: 8 }
];
const SelectionChart = () => {
    useEffect(() => {
        updateSampleSection();
    }, []);
    const [selectMode, setSelectMode] = useState('Point');
    const [highlightMode, setHighlightMode] = useState('None');
    const [isMultiSelect, setIsMultiSelect] = useState(false);
    const [selectPattern, setSelectPattern] = useState('None');
    const [highlightPattern, setHighlightPattern] = useState('None');
    const [highlightColor, setHighlightColor] = useState('');
    let chartInstance = useRef(null);
    let dropElement = useRef(null);
    let patternDropDownList = useRef(null);
    let highlightDropDownList = useRef(null);
    let checkElement = useRef(null);
    let checkBoxObj = useRef(null);
    let droplist = [
        { value: 'Point' },
        { value: 'Series' },
        { value: 'Cluster' }
    ];
    let patternTypes = [
        { value: 'None' },
        { value: 'DiagonalForward' },
        { value: 'Chessboard' },
        { value: 'Triangle' },
        { value: 'Box' },
        { value: 'HorizontalDash' }
    ];
    let patternTypes2 = [
        { value: 'None' },
        { value: 'Dots' },
        { value: 'Chessboard' },
        { value: 'Triangle' },
        { value: 'Bubble' },
        { value: 'Tile' },
        { value: 'Grid' }
    ];
    const onChartLoad = (args) => {
        let chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    const load = (args) => {
        loadChartTheme(args);
    };
    const change = () => {
        setSelectMode(dropElement.current.value);
        if (checkBoxObj.current.checked) {
            setHighlightMode(dropElement.current.value);
        }
        else {
            setHighlightMode('None');
        }
        chartInstance.current.dataBind();
    };
    const check = () => {
        setIsMultiSelect(checkElement.current.checked);
    };
    const selectionChange = () => {
        setSelectPattern(patternDropDownList.current.value);
    };
    const hightlightPatternChange = () => {
        if (checkBoxObj.current.checked) {
            setHighlightPattern(highlightDropDownList.current.value);
        }
        else {
            setHighlightPattern('None');
        }
    };
    const highlightChange = (e) => {
        if (e.target.checked) {
            setHighlightMode(chartInstance.current.selectionMode);
            setHighlightPattern(highlightDropDownList.current.value);
        }
        else {
            setHighlightMode('None');
            setHighlightPattern('None');
        }
    };
    // function to handle the ColorPicker change event
    const onChange = (args) => {
        setHighlightColor(args.currentValue.hex);
        chartInstance.current.dataBind();
    };
    return (<div className='control-pane'>
            <div className='control-section row'>
                <div className='col-md-8'>
                    <ChartComponent id='charts' ref={chartInstance} style={{ textAlign: "center" }} primaryXAxis={{ valueType: 'Category', interval: 1, labelIntersectAction: 'Rotate90', majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 } }} primaryYAxis={{ title: 'Distribution', labelFormat: '{value}%', lineStyle: { width: 0 }, interval: 20, majorTickLines: { width: 0 } }} load={load.bind(this)} chartArea={{ border: { width: 0 }, margin: { bottom: 12 } }} title='Age Distribution by Country' loaded={onChartLoad.bind(this)} legendSettings={{ visible: true, toggleVisibility: false }} selectionMode={selectMode} highlightMode={highlightMode} selectionPattern={selectPattern} highlightPattern={highlightPattern} isMultiSelect={isMultiSelect} highlightColor={highlightColor}>
                        <Inject services={[Selection, ColumnSeries, Legend, Category, ScatterSeries, Highlight]}/>
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={data1} xName='x' width={2} yName='y' name='Age 0-14' type='Column'/>
                            <SeriesDirective dataSource={data2} xName='x' width={2} yName='y' name='Age 15-64' type='Column'/>
                            <SeriesDirective dataSource={data3} xName='x' width={2} yName='y' name='Age 65 & Above' type='Column'/>
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
                                        <DropDownListComponent width="120px" id="selmode" change={change.bind(this)} ref={dropElement} dataSource={droplist} fields={{ text: 'value', value: 'value' }} value="Point"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '80%' }}>
                                    <div id="multiSelection">Enable Multi-selection:</div>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div><input type="checkbox" id="select" onChange={check.bind(this)} ref={checkElement} aria-labelledby="Checkbox unchecked"/></div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Selection Patterns:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="patternMode" change={selectionChange.bind(this)} ref={patternDropDownList} dataSource={patternTypes} fields={{ text: 'value', value: 'value' }} value="None"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Highlight Color:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <ColorPickerComponent id="inline-palette" mode="Palette" value="null" change={onChange.bind(this)}></ColorPickerComponent>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '80%' }}>
                                    <div id="highLight">Enable Hightlight Pattern:</div>
                                </td>
                                <td style={{ width: '20%' }}>
                                    <div>
                                        <input type="checkbox" id="highlightCheckbox" ref={checkBoxObj} onChange={highlightChange.bind(this)} aria-labelledby="Checkbox unchecked"/>
                                    </div>
                                </td>
                            </tr>
                            <tr style={{ height: '50px' }}>
                                <td style={{ width: '60%' }}>
                                    <div>Highlight Patterns:</div>
                                </td>
                                <td style={{ width: '40%' }}>
                                    <div>
                                        <DropDownListComponent width="120px" id="highpattern" change={hightlightPatternChange.bind(this)} ref={highlightDropDownList} dataSource={patternTypes2} fields={{ text: 'value', value: 'value' }} value="None"/>
                                    </div>
                                </td>
                            </tr></tbody>
                        </table>
                    </PropertyPane>
                </div>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the different modes of selection and highlight behavior in the charts.</p>
            </div>
            <div id="description">
                <p>
                    In this sample, any point or series can be selected in the chart by clicking on or touching the point. You can also change the selection mode by changing the <code>Selection Mode</code> option in the properties panel. You can enable multiple selections with the <code>Enable Multi Selection</code> option. You can also select a point while loading a chart using the <code>SelectedDataIndexes</code> option.
                    While hovering the point, the point is highlighted using the <code>Enable Highlight</code> option, as well as you can set different highlight patterns and colors using the <code>Highlight Patterns</code> and <code>Highlight Color</code> option.
                </p>
                <p>Tap to select a point or series, double tap and drag to enable rectangular selection in touch enabled devices.</p>
                <p>Chart supports seven mode of selection which can be set using <code>SelectionMode</code> property.
                </p>
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
                <br />
                <p>
                    More information about selection can be found in this <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/chart/selection/" aria-label="Navigate to the documentation for Selection in React Chart component">documentation section</a>.
                </p>
            </div>
        </div>);
};
export default SelectionChart;
