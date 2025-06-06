import * as React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, VirtualScroll, Edit, Toolbar } from '@syncfusion/ej2-react-grids';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { updateSampleSection } from '../common/sample-base';
import { datasource, virtualData } from './data';
// custom code end
function Virtualization() {
    React.useEffect(() => {
        updateSampleSection();
    }, []);
    // custom code start
    const SAMPLE_CSS = `
    .image {
        position: absolute;
        background-repeat: no-repeat;
        background-image: url('src/grid/images/spinner.gif');
        background-position: center;
        width: 16px;
        height: 28px;
    }

    .e-bigger .image {
        height: 36px;
    }
    
    #popup {
        position: absolute;
        background-color: transparent;
        display: none;
        z-index: 100;
    }
    .div-button{
        margin: 5px 5px 5px 0;
    }

    #performanceTime {
        float: right;
        margin-top: 3px;
    }

    .e-bigger #performanceTime{
        margin-top: 8px;
    }`;
    let grid;
    let date1;
    let date2;
    let flag = true;
    let data = [];
    const toolbarOptions = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
    const editSettings = { allowEditing: true, allowDeleting: true, newRowPosition: 'Top' };
    const validationSno = { required: true, digits: true };
    const validationRule = { required: true };
    function onclick() {
        if (!data.length) {
            show();
            datasource();
            date1 = new Date().getTime();
            grid.dataSource = data = virtualData;
            grid.editSettings.allowAdding = true;
        }
        else {
            flag = true;
            show();
            date1 = new Date().getTime();
            grid.refresh();
        }
    }
    function show() {
        document.getElementById('popup').style.display = 'inline-block';
    }
    function hide() {
        if (flag && date1) {
            date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) + 'ms';
            flag = false;
        }
        document.getElementById('popup').style.display = 'none';
    }
    return (<div className='control-pane'>
            <div className='control-section'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='div-button'>
                    <ButtonComponent cssClass={'e-info'} onClick={onclick.bind(this)}>Load 100K Data</ButtonComponent>
                    <span id="popup">
                        <span id="gif" className="image"></span>
                    </span>
                    <span id="performanceTime">Time Taken: 0 ms</span>
                </div>
                <GridComponent dataSource={[]} enableVirtualization={true} enableColumnVirtualization={true} height={400} ref={g => grid = g} dataBound={hide.bind(this)} toolbar={toolbarOptions} editSettings={editSettings}>
                    <ColumnsDirective>
                        <ColumnDirective field='SNo' headerText='S.No' width='140' validationRules={validationSno} isPrimaryKey={true}></ColumnDirective>
                        <ColumnDirective field='FIELD1' headerText='Player Name' width='130'></ColumnDirective>
                        <ColumnDirective field='FIELD2' headerText='Year' width='100'></ColumnDirective>
                        <ColumnDirective field='FIELD3' headerText='Sports' width='160' validationRules={validationRule} editType='dropdownedit'></ColumnDirective>
                        <ColumnDirective field='FIELD4' headerText='Country' width='160' editType='dropdownedit'></ColumnDirective>
                        <ColumnDirective field='FIELD5' headerText='LGID' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD6' headerText='GP' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD7' headerText='GS' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD8' headerText='Minutes' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD9' headerText='Points' width='130'></ColumnDirective>
                        <ColumnDirective field='FIELD10' headerText='OREB' width='140'></ColumnDirective>
                        <ColumnDirective field='FIELD11' headerText='DREB' width='140'></ColumnDirective>
                        <ColumnDirective field='FIELD12' headerText='REB' width='130'></ColumnDirective>
                        <ColumnDirective field='FIELD13' headerText='Assists' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD14' headerText='Steals' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD15' headerText='Blocks' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD16' headerText='Turnovers' width='140'></ColumnDirective>
                        <ColumnDirective field='FIELD17' headerText='PF' width='100'></ColumnDirective>
                        <ColumnDirective field='FIELD18' headerText='FGA' width='150'></ColumnDirective>
                        <ColumnDirective field='FIELD19' headerText='FGM' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD20' headerText='FTA' width='150'></ColumnDirective>
                        <ColumnDirective field='FIELD21' headerText='FTM' width='140'></ColumnDirective>
                        <ColumnDirective field='FIELD22' headerText='Three Attempted' width='170'></ColumnDirective>
                        <ColumnDirective field='FIELD23' headerText='Three Made' width='150'></ColumnDirective>
                        <ColumnDirective field='FIELD24' headerText='Post GP' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD25' headerText='Post GS' width='120'></ColumnDirective>
                        <ColumnDirective field='FIELD26' headerText='Post Minutes' width='150'></ColumnDirective>
                        <ColumnDirective field='FIELD27' headerText='Post Points' width='140'></ColumnDirective>
                        <ColumnDirective field='FIELD28' headerText='Post OREB' width='160'></ColumnDirective>
                        <ColumnDirective field='FIELD29' headerText='Post DREB' width='160'></ColumnDirective>
                        <ColumnDirective field='FIELD30' headerText='Post REB' width='160' editType='numericedit' validationRules={validationRule}></ColumnDirective>
                    </ColumnsDirective>
                    <Inject services={[VirtualScroll, Toolbar, Edit]}/>
                </GridComponent>
            </div>
            <div id="action-description">
                <p>This sample demonstrates the Grid component with the virtual scrolling feature. Click the button at the top of the Grid
                    to load data source and scroll the Grid content vertically and horizontally to load rows and columns respectively.
                </p>
            </div>
            <div id='description'>
                <p>
                    The Grid UI virtualization allows you to render only rows and columns visible within the view-port without buffering the entire datasource.
                    Grid supports row and column virtualization.
                    To enable row virtualization, set <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#enablevirtualization">
                        enableVirtualization </a></code> property as true. For column virtualization, set <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#enablecolumnvirtualization">
                            enableColumnVirtualization
                        </a></code> property as true.
                </p>
                <p>
                    Note: The <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#height">
                        height</a></code> property must be defined when enabling <code><a target="_blank" className="code" href="https://ej2.syncfusion.com/react/documentation/api/grid/#enablevirtualization">
                            enableVirtualization </a></code>.
                </p>
                <p>
                    In this demo, Grid enabled row and column virtualization. Click the Load 100K Data button to bind 100000 rows and 30 columns. You can also perform the Edit action in this sample.
                </p>
                <p style={{ fontWeight: 500 }}>Injecting Module:</p>
                <p>Grid component features are segregated into individual feature-wise modules. To use Virtualscrolling feature, we need to inject <code>VirtualScroll</code> modeule into the <code>services</code>.</p>
            </div>
        </div>);
}
export default Virtualization;
