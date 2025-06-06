/**
 * Rangeband sample for sparkline
 */
import * as React from "react";
import { PropertyPane } from '../common/property-pane';
import { SliderComponent } from "@syncfusion/ej2-react-inputs";
import { SparklineComponent, Sparkline } from '@syncfusion/ej2-react-charts';
import { getInstance } from '@syncfusion/ej2-base';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { updateSampleSection } from '../common/sample-base';
import { products } from './data-source';
import { loadSparkLineTheme } from './theme-color';
const SAMPLE_CSS = `
     .control-fluid {
         padding: 0px !important;
     }
     td{
         padding: 10px;
     }
     .e-headertext{
         font-weight: bolder;
     }
     #range-min > * {
         padding: 0px !important;
     }
     #range-max > * {
         padding: 0px !important;
     }`;
function RangeBand() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    let sparklineInstance;
    let minElement;
    let maxElement;
    function load(args) {
        loadSparkLineTheme(args);
    }
    let lineData = [
        [0, 6, 4, 1, 3, 2, 5],
        [5, 4, 6, 3, 1, 2, 0],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6],
        [2, 4, 0, 3, 5, 6, 1],
        [5, 4, 6, 3, 1, 2, 0],
        [0, 6, 4, 1, 3, 2, 5],
        [6, 4, 0, 3, 2, 5, 1],
        [4, 6, 3, 0, 1, 2, 5],
        [2, 4, 0, 3, 5, 6, 1],
        [3, 5, 6, 4, 0, 1, 2],
        [1, 3, 4, 2, 5, 0, 6]
    ];
    const minChange = () => {
        let value = parseInt(minElement.value.toString(), 10);
        changeRangeMin(value);
    };
    const maxChange = () => {
        let value = parseInt(maxElement.value.toString(), 10);
        changeRangeMax(value);
    };
    const changeRangeMin = (min) => {
        for (let i = 1; i < 6; i++) {
            let first = getInstance('#sparkline2010' + i, Sparkline);
            let second = getInstance('#sparkline2011' + i, Sparkline);
            first.rangeBandSettings[0].startRange = min;
            second.rangeBandSettings[0].startRange = min;
            document.getElementById('range1').innerHTML = 'Range Band Min <span>' + minElement.value;
            first.refresh();
            second.refresh();
        }
    };
    const changeRangeMax = (max) => {
        for (let i = 1; i < 6; i++) {
            let first = getInstance('#sparkline2010' + i, Sparkline);
            let second = getInstance('#sparkline2011' + i, Sparkline);
            first.rangeBandSettings[0].endRange = max;
            second.rangeBandSettings[0].endRange = max;
            document.getElementById('range2').innerHTML = 'Range Band Max <span>' + maxElement.value;
            first.refresh();
            second.refresh();
        }
    };
    function renderSparkline() {
        let sparkline = {
            height: '50px',
            width: '150px',
            lineWidth: 2,
            fill: '#0d3c9b',
            dataSource: lineData[0],
            rangeBandSettings: [{ startRange: 1, endRange: 3, color: '#bfd4fc' }]
        };
        setTimeout(() => {
            for (let i = 1; i < 6; i++) {
                let first = new SparklineComponent(sparkline);
                first.dataSource = lineData[i];
                first.appendTo('#sparkline2010' + i);
                let second = new SparklineComponent(sparkline);
                second.dataSource = lineData[i + 5];
                second.appendTo('#sparkline2011' + i);
            }
        }, 500);
    }
    return (<div className='control-pane'>
                 <style>
                     {SAMPLE_CSS}
                 </style>
 
                 <div className='col-md-8 control-section'>
                     <div style={{ "fontSize": "16px", "textAlign": "center" }}>
                         Sales Growth Comparison with various Products
                     </div>
                     <GridComponent dataSource={products} resizing={renderSparkline.bind(this)} load={renderSparkline.bind(this)} height='400' allowSelection={false} enableHover={true}>
                         <ColumnsDirective>
                             <ColumnDirective field='name' headerText='Name' textAlign='Right' width='50'/>
                             <ColumnDirective headerText='2010' template={(props) => {
            return (<div id={"sparkline2010" + props.id}></div>);
        }} textAlign='Center' width='100'/>
                             <ColumnDirective headerText='One Day Index' template={(props) => {
            return (<div id={"sparkline2011" + props.id}></div>);
        }} textAlign='Center' width='100'/>
                         </ColumnsDirective>
                     </GridComponent>
                 </div>
                 {/* Property Panel */}
                 <div className='col-md-4 property-section'>
                     <PropertyPane title='Properties'>
                         <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%' }}>
                             <tbody>
                                 <tr>
                                     <td>
                                         <div id='range1'>Range Band Min <span>&nbsp;&nbsp;&nbsp;1</span> </div>
                                     </td>
                                     <td>
                                         <SliderComponent type='MinRange' change={minChange.bind(this)} ref={(slider) => minElement = slider} step={1} id="range-min" value={1} min={0} max={6} style={{ width: '100px' }}/>
                                     </td>
                                 </tr>
                                 <tr>
                                     <td>
                                         <div id='range2'>Range Band Max <span>&nbsp;&nbsp;&nbsp;3</span> </div>
                                     </td>
                                     <td>
                                         <SliderComponent type='MinRange' change={maxChange.bind(this)} ref={(slider) => maxElement = slider} step={1} id="range-max" value={3} min={0} max={6} style={{ width: '100px' }}/>
                                     </td>
                                 </tr>
                             </tbody>
                         </table>
                     </PropertyPane>
                 </div>
                 <div id="action-description">
                     <p>
                         This sample depicts the range band feature and its customization options available in sparklines.
                     </p>
                 </div>
                 <div id="description">
                     <p>
                         In this example, you can see how to render sparkline with range band and the customization options available in range band. Here, the sparklines are placed inside the data grid control.
                     </p>
                 </div>
             </div>);
}
export default RangeBand;
